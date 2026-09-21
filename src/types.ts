export interface GeoLocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string;
  timezone?: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface WeatherData {
  location: GeoLocationResult;
  current: CurrentWeather;
  daily: DailyForecast;
  timezone: string;
  elevation?: number;
  lastUpdated: string;
}

export type TempUnit = 'celsius' | 'fahrenheit';

export interface ActivityItem {
  name: string;
  category: 'outdoor' | 'indoor';
  status: 'ideal' | 'caution' | 'not-recommended' | 'recommended';
  reason: string;
  iconName: string;
}

export interface PlanningAdvice {
  outdoorScore: number; // 0 to 100
  ratingLabel: string;
  headline: string;
  overview: string;
  clothingTips: string[];
  gearRecommendations: string[];
  outdoorActivities: ActivityItem[];
  indoorActivities: ActivityItem[];
  travelAdvisory: string;
  bestTimeOfDay: string;
}
