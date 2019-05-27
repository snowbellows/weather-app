import { ActionTree } from 'vuex';
import axios from 'axios';
import { WeatherState, ApiResponse } from './types';
import { RootState } from '../types';

export const actions: ActionTree<WeatherState, RootState> = {
  getLocation({ commit, dispatch }) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          commit('setGeolocation', position);
          dispatch('getWeather');
        },
        (error) => {
          commit('setGeoError', error);
        },
      );
    } else {
      commit('setGeoError', new Error('Geolocation is not enabled'));
    }
  },
  getWeather({ dispatch, state, commit }) {
    if (state.geolocation) {
      axios
        .get(
          'http://api.openweathermap.org/data/2.5/forecast?lat=' +
            (state.geolocation as Position).coords.latitude +
            '&lon=' +
            (state.geolocation as Position).coords.longitude +
            '&appid=' +
            state.apiKey +
            '&units=metric',
        )
        .then((response) => {
          const dayWeatherList = (response.data as ApiResponse).list
            .filter((day) => {
              const dateHours = new Date(day.dt * 1000).getUTCHours();
              const todayHours = new Date(Date.now()).getUTCHours();
              return dateHours === todayHours + (3 - (todayHours % 3));
            })
            .map((day) => {
              const minTemp = (response.data as ApiResponse).list
                .filter(
                  (otherDay) =>
                    new Date(day.dt * 1000).getDate() ===
                    new Date(otherDay.dt * 1000).getDate(),
                )
                .map((minDay) => minDay.main.temp)
                .reduce((a, b) => Math.min(a, b));
              const maxTemp = (response.data as ApiResponse).list
                .filter(
                  (otherDay) =>
                    new Date(day.dt * 1000).getDate() ===
                    new Date(otherDay.dt * 1000).getDate(),
                )
                .map((maxDay) => maxDay.main.temp)
                .reduce((a, b) => Math.max(a, b));
              return {
                dt: day.dt,
                temp: Math.round(day.main.temp),
                min_temp: Math.round(minTemp),
                max_temp: Math.round(maxTemp),
                humidity: day.main.humidity,
                weather: {
                  main: day.weather[0].main,
                  description: day.weather[0].description,
                  icon: day.weather[0].icon,
                },
                clouds: day.clouds ? day.clouds.all : undefined,
                wind_speed: day.wind ? day.wind.speed : undefined,
                rain: day.rain ? day.rain['3h'] : undefined,
                snow: day.snow ? day.snow['3h'] : undefined,
              };
            });
          commit('setCurrentDay', dayWeatherList[0]);
          return commit('setDayWeatherList', dayWeatherList);
        })
        .catch((error) => commit('setApiError', error));
    } else {
      dispatch('getLocation');
    }
  },
};
