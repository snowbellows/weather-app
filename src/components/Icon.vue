<template>
  <div class="icon">
    <img
      :src="'http://localhost:8080/icons/' + iconName + '.svg'"
      :width="100 + '%'"
      :alt="description"
      class="icon-image"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const AppProps = Vue.extend({
  props: {
    icon: {
      type: String,
      default: '01d',
    },
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
  },
});

@Component({})
export default class WeatherCard extends AppProps {
  get description() {
    return (
      this.iconName.charAt(0).toUpperCase() +
      this.iconName.slice(1).replace('-', ' ')
    );
  }
  get iconName() {
    switch (this.icon) {
      case '02d':
      case '02n':
        return 'few-clouds';
        break;
      case '03d':
      case '03n':
        return 'scattered-clouds';
        break;
      case '04d':
      case '04n':
        return 'broken-clouds';
        break;
      case '09d':
      case '09n':
        return 'shower-rain';
        break;
      case '10d':
      case '10n':
        return 'rain';
        break;
      case '11d':
      case '11n':
        return 'thunderstorm';
        break;
      case '13d':
      case '13n':
        return 'snow';
        break;
      case '50d':
      case '50n':
        return 'mist';
        break;
      default:
        return 'clear-sky';
    }
  }
}
</script>

<style scoped>
.icon {
  font-size: 1rem;
  display: flex;
  align-content: center;
  justify-content: center;
  flex: 0 2 auto;
}

.icon-image {
  flex: 0 2 auto;
}
</style>
