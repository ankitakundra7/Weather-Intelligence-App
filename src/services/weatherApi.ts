import { GeoLocationResult, WeatherData } from '../types';

export class WeatherApiError extends Error {
  constructor(
    message: string,
    public readonly type: 'NOT_FOUND' | 'NETWORK_ERROR' | 'INVALID_INPUT' | 'API_ERROR' = 'API_ERROR'
  ) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

/**
 * Searches for a city using Open-Meteo Geocoding API
 * https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1
 */
export async function searchCity(query: string, count: number = 1): Promise<GeoLocationResult[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new WeatherApiError('Please enter a city or location name to search.', 'INVALID_INPUT');
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=${count}&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new WeatherApiError(`Geocoding server responded with HTTP ${response.status}`, 'API_ERROR');
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new WeatherApiError(
        `Could not locate "${trimmed}". Please check the spelling or specify a nearby major city.`,
        'NOT_FOUND'
      );
    }

    return data.results as GeoLocationResult[];
  } catch (err: unknown) {
    if (err instanceof WeatherApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Unknown network failure';
    throw new WeatherApiError(
      `Unable to reach weather lookup service: ${message}. Check your internet connection.`,
      'NETWORK_ERROR'
    );
  }
}

/**
 * Fetches current weather and 7-day forecast using Open-Meteo Forecast API:
 * https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto
 */
export async function getWeatherData(location: GeoLocationResult): Promise<WeatherData> {
  const { latitude, longitude } = location;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new WeatherApiError(`Weather forecast service responded with HTTP ${response.status}`, 'API_ERROR');
    }

    const data = await response.json();

    if (!data.current_weather || !data.daily) {
      throw new WeatherApiError('Received incomplete meteorological data from Open-Meteo.', 'API_ERROR');
    }

    return {
      location,
      current: data.current_weather,
      daily: data.daily,
      timezone: data.timezone || location.timezone || 'auto',
      elevation: data.elevation ?? location.elevation,
      lastUpdated: new Date().toISOString(),
    };
  } catch (err: unknown) {
    if (err instanceof WeatherApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Unknown network failure';
    throw new WeatherApiError(
      `Failed to retrieve weather metrics for ${location.name}: ${message}.`,
      'NETWORK_ERROR'
    );
  }
}

/**
 * Helper to fetch complete weather directly by city name
 */
export async function fetchWeatherForCity(cityName: string): Promise<WeatherData> {
  const results = await searchCity(cityName, 1);
  const primaryMatch = results[0];
  return await getWeatherData(primaryMatch);
}

/**
 * Approximate city resolution for device coordinates
 */
export async function resolveLocationFromCoords(lat: number, lon: number): Promise<GeoLocationResult> {
  try {
    // Open-Meteo reverse or BigDataCloud client-safe reverse geocoding
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (response.ok) {
      const data = await response.json();
      return {
        id: Math.round(lat * 1000 + lon),
        name: data.city || data.locality || data.principalSubdivision || 'Current Location',
        latitude: lat,
        longitude: lon,
        country: data.countryName || '',
        country_code: data.countryCode || '',
        admin1: data.principalSubdivision || '',
      };
    }
  } catch {
    // fallback directly to coordinate location
  }

  return {
    id: Math.round(lat * 1000 + lon),
    name: 'Current Coordinates',
    latitude: lat,
    longitude: lon,
    admin1: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
  };
}
