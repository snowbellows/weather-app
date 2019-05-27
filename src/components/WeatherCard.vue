<template>
  <div class="card-container">
    <HighlightedWeather :dayWeather="currentDay"></HighlightedWeather>
    <div class="forecast-list">
      <ForecastWeather
        v-for="day in weather"
        :key="day.dt"
        :dayWeather="day"
        :isActive="day.dt === currentDay.dt"
      ></ForecastWeather>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { WeatherState, DayWeather } from '../store/weather/types';
import { mapState, mapActions, mapGetters } from 'vuex';
import { state } from '../store/weather';
import HighlightedWeather from './HighlightedWeather.vue';
import ForecastWeather from './ForecastWeather.vue';

@Component({
  computed: {
    ...mapState({
      weather: (WeatherState) => state.dayWeatherList,
      currentDay: (WeatherState) => state.currentDay,
    }),
    ...mapGetters(['fiveDays']),
  },

  methods: { ...mapActions(['getWeather']) },

  components: {
    HighlightedWeather,
    ForecastWeather,
  },
})
export default class WeatherCard extends Vue {
  private weather!: DayWeather[];
  private getWeather!: () => void;
  private mounted() {
    this.getWeather();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-container {
  display: flex;
  max-height: 40rem;
  max-width: 700px;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px #dadada;
}

.forecast-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

@media (max-width: 700px) {
  .card-container {
    height: 100vh;
    width: 100%;
    align-content: flex-start;
    box-shadow: none;
  }
}
</style>
