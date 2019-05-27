import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { WeatherState } from './types';
import { RootState } from '../types';

export const state: WeatherState = {
  dayWeatherList: null,
  apiError: null,
  apiKey: '50e9ab4bb747f5776ab328ef6bfa9ea8',
  geolocation: null,
  geoError: null,
  currentDay: null,
};

const namespaced: boolean = false;

export const weather: Module<WeatherState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
