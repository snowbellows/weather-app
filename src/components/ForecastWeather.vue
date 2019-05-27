<template>
  <button class="forecast-container" :class="{active: isActive}" v-on:click="$store.commit('setCurrentDay', dayWeather)">
    <div class="date-item">{{ date }}</div>
    <div>
      Min: {{ dayWeather.min_temp }}°C
      <br>
      Max: {{ dayWeather.max_temp }}°C
    </div>
    <Icon :width="iconSize" :height="iconSize" :icon="icon"></Icon>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { DayWeather } from '../store/weather/types';
import Icon from './Icon.vue';

const AppProps = Vue.extend({
  props: {
    dayWeather: { type: Object as () => DayWeather },
    isActive: { type: Boolean },
  },
});

@Component({
  components: {
    Icon,
  },
})
export default class ForecastWeather extends AppProps {
  get icon() {
    return this.dayWeather.weather.icon;
  }
  get date() {
    const currentDate = new Date(this.dayWeather.dt * 1000);
    return currentDate.getDate() + '/' + currentDate.getMonth();
  }
  get iconSize() {
      return 50;
  }
}
</script>


<style scoped>
button {
    border: none;
}

button:active {
  border: none;
}

button:focus {
    outline: none;
    
}

.forecast-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  background: #f0f0f0;
  padding: 0.5rem;
}

.active {
  background: #ffffff;
}

.date-item {
  flex: 1 1 auto;
  font-size: 1.5rem;
}

.icon {
      width: 50px;
      height: 50px;
      flex: 1 2 auto;
    }

@media (max-width: 700px) {
    .forecast-container {
        padding: 1rem;
    }

    .date-item {
        font-size: 1rem;
    }
}
</style>
