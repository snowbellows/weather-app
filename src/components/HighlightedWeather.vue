<template>
  <div class="detail-container">
    <div class="temperature-item">
      <!-- 1st in html 2nd in flex order for screenreader accessibility -->
      <div>{{ dayWeather.temp }}°C</div>
      <Icon :width="iconSize" :height="iconSize" :icon="icon"></Icon>
    </div>
    <div class="detail-item">
      <ul>
        <li class="date">{{ date.getDate() }}/{{ date.getMonth() }} {{ date.getHours() }}:00</li>
        <li vi-if="description" class="detail">{{description | capitalize}}</li>
        <li
          v-for="(item, name) in details"
          :key="name"
          class="detail"
        >{{name | capitalize}}: {{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { WeatherState, ApiResponse, DayWeather } from '../store/weather/types';
import { mapState, mapActions } from 'vuex';
import { state } from '../store/weather';
import Icon from './Icon.vue';

const AppProps = Vue.extend({
  props: {
    dayWeather: { type: Object as () => DayWeather },
  },
  filters: {
    capitalize(value: string) {
      if (!value) { return ''; }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
});

@Component({
  components: {
    Icon,
  },
})
export default class WeatherCard extends AppProps {
  get description() {
    if (this.dayWeather.weather.description) {
      return this.dayWeather.weather.description;
    }
  }
  get details() {
    let details = {};

    details = Object.assign({}, details, { min: this.dayWeather.min_temp + '°C' });

    details = Object.assign({}, details, { max: this.dayWeather.max_temp + '°C' });

    if (this.dayWeather.humidity) {
      details = Object.assign({}, details, { humidity: this.dayWeather.humidity + '%' });
    }
    if (this.dayWeather.clouds) {
      details = Object.assign({}, details, { clouds: this.dayWeather.clouds + '%' });
    }
    if (this.dayWeather.rain) {
      details = Object.assign({}, details, { rain: this.dayWeather.rain + 'mm' });
    }
    if (this.dayWeather.wind_speed) {
      details = Object.assign({}, details, { wind: this.dayWeather.wind_speed + 'm/s' });
    }

    // Object.assign(details, { date: this.date.toLocaleString()});
    return details;
  }
  get date() {
    return new Date(this.dayWeather.dt * 1000);
  }
  get icon() {
    return this.dayWeather.weather.icon;
  }
  get iconSize() {
      return 200;
  }
}
</script>


<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.detail-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  background: #e8f3ff;
  height: 25rem;
  width: 700px;
}

.temperature-item {
  flex: 1 1 auto;
  display: flex;
  order: 2;
  font-size: 7rem;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem 1rem 1rem;
}

.detail-item {
  flex: 1 1 auto;
  display: flex;
  order: 1;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  padding: 2rem 1rem 1rem 3rem;
}

.detail {
  font-size: 1.5rem;
}

  .icon {
    width: 200px;
    height: 200px;
  }

@media (max-width: 700px) {
  .detail-container {
    height: 100vh;
    width: 100%;
    flex-flow: row nowrap;
  }
  .temperature-item {
    padding: 1rem 1rem 1rem 1rem;
  }

  .detail-item {
      font-size: 1.5rem;
      padding: 1rem 1rem 1rem 1rem;
  }

  .detail {
      font-size: 1rem;
  }

  .temperature-item {
      font-size: 4rem;
  }
  .icon {
    width: 100px;
    height: 100px;
  }
}
</style>
