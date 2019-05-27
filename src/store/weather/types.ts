export interface WeatherState {
  dayWeatherList: DayWeather[] | null;
  apiError: Error | null;
  geolocation: Position | null;
  geoError: Error | null;
  apiKey: string;
  currentDay: DayWeather | null;
}

export interface ApiResponse {
  city: { id: number; name: string };
  coord: { lon: number; lat: number };
  country: string;
  cod: string;
  message: number;
  cnt: number;
  list: [DayObject];
}

interface DayObject {
  dt: number;
  main: MainTemp;
  weather: Weather[];
  clouds?: { all: number };
  wind?: { speed?: number; deg?: number };
  rain?: { '3h': number };
  snow?: { '3h': number };
  dt_txt: string;
}

interface MainTemp {
  temp: number;
  temp_min?: number;
  temp_max?: number;
  pressure?: number;
  sea_level?: number;
  grnd_level?: number;
  humidity?: number;
  temp_kf?: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DayWeather {
  dt: number;
  temp: number;
  min_temp: number;
  max_temp: number;
  humidity?: number;
  weather: { main: string; description: string; icon: string };
  clouds?: number;
  wind_speed?: number;
  rain?: number;
  snow?: number;
}
