<template>
  <div id="app" class="app-container">
    <div v-if="geoError" class="error">Error retreiving geolocation data, please check your settings</div>
    <div v-if="apiError" class="error">
      Error accessing Open Weather Map api:
      <span v-if="apiError.message">
        <br>
        {{apiError.message}}
      </span>
    </div>
    <WeatherCard v-if="noError"></WeatherCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WeatherCard from './components/WeatherCard.vue';
import { mapState } from 'vuex';
import { state } from './store/weather';

@Component({
  computed: mapState({
    geoError: (WeatherState) => state.geoError,
    apiError: (WeatherState) => state.apiError,
  }),
  components: {
    WeatherCard,
  },
})
export default class App extends Vue {
  public geoError!: Error;
  public apiError!: Error;

  get noError() {
    return !(this.geoError || this.apiError);
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  
}

.app-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
}

.error {
  min-width: 50%;
  background: #660909;
  color: white;
  display: inline;
  padding: 1rem;
}

@media (max-width: 700px) {
  .app-container {
    align-content: center;
    background-color: #e8f3ff;
  }
}

body {
  margin: 0;
}
</style>
