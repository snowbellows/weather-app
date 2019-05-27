import { MutationTree } from 'vuex';
import { WeatherState, ApiResponse, DayWeather } from './types';

export const mutations: MutationTree<WeatherState> = {
  setDayWeatherList(state, newDayWeatherList: DayWeather[]) {
    state.dayWeatherList = newDayWeatherList;
  },
  setApiError(state, newError: Error) {
    state.apiError = newError;
    state.dayWeatherList = null;
  },
  setGeoError(state, newError: Error) {
    state.geoError = newError;
    state.geolocation = null;
  },
  setGeolocation(state, newGeo) {
    state.geolocation = newGeo;
  },
  setCurrentDay(state, newDay) {
    state.currentDay = newDay;
  },
};
