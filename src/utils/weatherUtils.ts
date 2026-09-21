import { CurrentWeather, DailyForecast, PlanningAdvice, TempUnit, ActivityItem } from '../types';

export interface WeatherConditionInfo {
  label: string;
  description: string;
  category: 'clear' | 'partly-cloudy' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  isPrecipitating: boolean;
  isSevere: boolean;
  icon: string;
  badgeColor: string;
  accentBg: string;
}

export function getWeatherCondition(code: number, isDay: number = 1): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        label: isDay ? 'Clear Sky' : 'Clear Night',
        description: isDay ? 'Unobstructed sunshine with crystal clear skies.' : 'Clear starry skies with calm visibility.',
        category: 'clear',
        isPrecipitating: false,
        isSevere: false,
        icon: isDay ? 'Sun' : 'Moon',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
        accentBg: 'from-amber-500/10 to-orange-500/10',
      };
    case 1:
      return {
        label: isDay ? 'Mainly Sunny' : 'Mainly Clear',
        description: 'Scattered clouds with mostly bright conditions.',
        category: 'partly-cloudy',
        isPrecipitating: false,
        isSevere: false,
        icon: isDay ? 'SunMedium' : 'CloudMoon',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-800',
        accentBg: 'from-sky-500/10 to-blue-500/10',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        description: 'Pleasant mix of sunshine and drifting cumulus clouds.',
        category: 'partly-cloudy',
        isPrecipitating: false,
        isSevere: false,
        icon: isDay ? 'CloudSun' : 'CloudMoon',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
        accentBg: 'from-sky-500/10 to-slate-500/10',
      };
    case 3:
      return {
        label: 'Overcast',
        description: 'Dense cloud ceiling diffusing direct sunlight.',
        category: 'cloudy',
        isPrecipitating: false,
        isSevere: false,
        icon: 'Cloud',
        badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700',
        accentBg: 'from-zinc-500/10 to-slate-500/10',
      };
    case 45:
    case 48:
      return {
        label: code === 48 ? 'Rime Fog' : 'Dense Fog',
        description: 'Reduced atmospheric visibility; moist air near the ground.',
        category: 'fog',
        isPrecipitating: false,
        isSevere: false,
        icon: 'CloudFog',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200 dark:border-teal-800',
        accentBg: 'from-teal-500/10 to-slate-500/10',
      };
    case 51:
    case 53:
    case 55:
      return {
        label: code === 51 ? 'Light Drizzle' : code === 53 ? 'Moderate Drizzle' : 'Heavy Drizzle',
        description: 'Fine atmospheric misting and light droplets.',
        category: 'drizzle',
        isPrecipitating: true,
        isSevere: false,
        icon: 'CloudDrizzle',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-200 dark:border-cyan-800',
        accentBg: 'from-cyan-500/10 to-blue-500/10',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing Drizzle',
        description: 'Sub-freezing mist creating icy road surfaces.',
        category: 'drizzle',
        isPrecipitating: true,
        isSevere: true,
        icon: 'CloudSnow',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-200 dark:border-indigo-800',
        accentBg: 'from-indigo-500/10 to-cyan-500/10',
      };
    case 61:
      return {
        label: 'Light Rain',
        description: 'Intermittent gentle rainfall; damp outdoor surfaces.',
        category: 'rain',
        isPrecipitating: true,
        isSevere: false,
        icon: 'CloudRain',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800',
        accentBg: 'from-blue-500/10 to-indigo-500/10',
      };
    case 63:
      return {
        label: 'Moderate Rain',
        description: 'Steady rainfall with puddling on roads and walkways.',
        category: 'rain',
        isPrecipitating: true,
        isSevere: false,
        icon: 'CloudRain',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-400 dark:bg-blue-900/60 dark:text-blue-200 dark:border-blue-700',
        accentBg: 'from-blue-600/10 to-sky-600/10',
      };
    case 65:
      return {
        label: 'Heavy Rain',
        description: 'Intense precipitation; localized water runoff and reduced visibility.',
        category: 'rain',
        isPrecipitating: true,
        isSevere: true,
        icon: 'CloudRain',
        badgeColor: 'bg-blue-200 text-blue-950 border-blue-400 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-600',
        accentBg: 'from-blue-700/15 to-indigo-700/15',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing Rain',
        description: 'Liquid precipitation freezing on contact, hazardous ice glaze.',
        category: 'rain',
        isPrecipitating: true,
        isSevere: true,
        icon: 'CloudSnow',
        badgeColor: 'bg-purple-100 text-purple-950 border-purple-300 dark:bg-purple-950/70 dark:text-purple-200 dark:border-purple-800',
        accentBg: 'from-purple-500/15 to-blue-500/15',
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        label: code === 71 ? 'Light Snow' : code === 73 ? 'Moderate Snow' : 'Heavy Snowfall',
        description: 'Crystalline snowfall accumulating on horizontal surfaces.',
        category: 'snow',
        isPrecipitating: true,
        isSevere: code === 75,
        icon: 'Snowflake',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700',
        accentBg: 'from-cyan-500/10 to-slate-500/10',
      };
    case 80:
    case 81:
    case 82:
      return {
        label: code === 82 ? 'Violent Showers' : code === 81 ? 'Moderate Showers' : 'Passing Showers',
        description: 'Sudden rain bursts with quick intervals of dry breaks.',
        category: 'rain',
        isPrecipitating: true,
        isSevere: code === 82,
        icon: 'CloudRain',
        badgeColor: 'bg-sky-100 text-sky-950 border-sky-400 dark:bg-sky-900 dark:text-sky-100 dark:border-sky-700',
        accentBg: 'from-sky-600/15 to-blue-600/15',
      };
    case 85:
    case 86:
      return {
        label: 'Snow Showers',
        description: 'Passing flurry activity with rapid shifts in ground visibility.',
        category: 'snow',
        isPrecipitating: true,
        isSevere: false,
        icon: 'Snowflake',
        badgeColor: 'bg-indigo-100 text-indigo-950 border-indigo-300 dark:bg-indigo-950/70 dark:text-indigo-200 dark:border-indigo-800',
        accentBg: 'from-indigo-500/10 to-slate-500/10',
      };
    case 95:
      return {
        label: 'Thunderstorm',
        description: 'Atmospheric instability with lightning discharge and sudden wind gusts.',
        category: 'thunderstorm',
        isPrecipitating: true,
        isSevere: true,
        icon: 'CloudLightning',
        badgeColor: 'bg-amber-100 text-amber-950 border-amber-400 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700',
        accentBg: 'from-amber-600/15 to-red-600/15',
      };
    case 96:
    case 99:
      return {
        label: 'Thunderstorm with Hail',
        description: 'Severe electrical storm accompanied by damaging hail particles.',
        category: 'thunderstorm',
        isPrecipitating: true,
        isSevere: true,
        icon: 'CloudLightning',
        badgeColor: 'bg-rose-100 text-rose-950 border-rose-400 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-700',
        accentBg: 'from-rose-600/15 to-purple-600/15',
      };
    default:
      return {
        label: 'Variable Conditions',
        description: 'Mixed atmospheric readings with moderate stability.',
        category: 'partly-cloudy',
        isPrecipitating: false,
        isSevere: false,
        icon: 'Cloud',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
        accentBg: 'from-slate-500/10 to-zinc-500/10',
      };
  }
}

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function kmhToMph(kmh: number): number {
  return kmh * 0.621371;
}

export function formatTemp(celsius: number, unit: TempUnit): string {
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius;
  return `${Math.round(value)}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}

export function formatWind(kmh: number, unit: TempUnit): string {
  if (unit === 'fahrenheit') {
    return `${Math.round(kmhToMph(kmh))} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}

export function getWindDirection(deg: number): { label: string; full: string } {
  const directions = [
    { label: 'N', full: 'North' },
    { label: 'NNE', full: 'North-Northeast' },
    { label: 'NE', full: 'Northeast' },
    { label: 'ENE', full: 'East-Northeast' },
    { label: 'E', full: 'East' },
    { label: 'ESE', full: 'East-Southeast' },
    { label: 'SE', full: 'Southeast' },
    { label: 'SSE', full: 'South-Southeast' },
    { label: 'S', full: 'South' },
    { label: 'SSW', full: 'South-Southwest' },
    { label: 'SW', full: 'Southwest' },
    { label: 'WSW', full: 'West-Southwest' },
    { label: 'W', full: 'West' },
    { label: 'WNW', full: 'West-Northwest' },
    { label: 'NW', full: 'Northwest' },
    { label: 'NNW', full: 'North-Northwest' },
  ];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index] || { label: 'N', full: 'North' };
}

export function generatePlanningAdvice(
  current: CurrentWeather,
  daily: DailyForecast
): PlanningAdvice {
  const condition = getWeatherCondition(current.weathercode, current.is_day);
  const temp = current.temperature;
  const wind = current.windspeed;
  const isRainingOrWet = condition.isPrecipitating;
  const isSevere = condition.isSevere;

  let outdoorScore = 85;
  const clothingTips: string[] = [];
  const gearRecommendations: string[] = [];
  const outdoorActivities: ActivityItem[] = [];
  const indoorActivities: ActivityItem[] = [];
  let travelAdvisory = 'Normal commuting conditions. Maintain typical situational awareness.';
  let bestTimeOfDay = 'Midday to late afternoon offers peak thermal comfort.';

  // Deductions based on weather factors
  if (isSevere) {
    outdoorScore = Math.min(outdoorScore, 20);
  } else if (isRainingOrWet) {
    if (condition.category === 'drizzle') outdoorScore -= 25;
    else if (condition.category === 'rain') outdoorScore -= 45;
    else if (condition.category === 'snow') outdoorScore -= 40;
  }

  // Temperature penalties
  if (temp < 0) {
    outdoorScore -= 30;
  } else if (temp < 10) {
    outdoorScore -= 15;
  } else if (temp > 32) {
    outdoorScore -= 25;
  } else if (temp > 28) {
    outdoorScore -= 10;
  } else if (temp >= 18 && temp <= 25 && !isRainingOrWet) {
    outdoorScore = Math.min(100, outdoorScore + 10);
  }

  // Wind penalties
  if (wind > 40) {
    outdoorScore -= 30;
  } else if (wind > 25) {
    outdoorScore -= 15;
  }

  // Boundary clamp
  outdoorScore = Math.max(10, Math.min(98, outdoorScore));

  // Rating label & headline
  let ratingLabel = 'Good';
  let headline = 'Favorable Conditions';
  if (outdoorScore >= 80) {
    ratingLabel = 'Prime';
    headline = 'Superb Outdoor Weather Window';
  } else if (outdoorScore >= 60) {
    ratingLabel = 'Favorable';
    headline = 'Generally Pleasant with Minor Precautions';
  } else if (outdoorScore >= 40) {
    ratingLabel = 'Moderate';
    headline = 'Mixed Conditions — Plan Adaptively';
  } else {
    ratingLabel = 'Challenging';
    headline = 'Unfavorable Outdoor Climate — Indoor Prioritized';
  }

  // Clothing & Gear Rules
  if (temp > 27) {
    clothingTips.push('Breathable, moisture-wicking fabrics and lightweight, loose-fitting cotton.');
    clothingTips.push('Wide-brim hat or ventilated cap to shield against direct radiant heat.');
    gearRecommendations.push('High-SPF broad spectrum sunscreen (SPF 30+)');
    gearRecommendations.push('UV400 polarized sunglasses');
    gearRecommendations.push('Insulated hydration bottle (minimum 1 liter)');
    bestTimeOfDay = 'Early morning before 10 AM or sunset after 6 PM when solar exposure drops.';
  } else if (temp >= 18 && temp <= 27) {
    clothingTips.push('Versatile smart-casual layers: short sleeves with an optional light cardigan or overshirt.');
    clothingTips.push('Comfortable walking shoes or trainers suited for extended foot travel.');
    gearRecommendations.push('Sunglasses for intermittent direct glare');
    gearRecommendations.push('Light packable tote or daypack');
  } else if (temp >= 10 && temp < 18) {
    clothingTips.push('Thermal mid-layer such as a merino wool knit or fleece jacket.');
    clothingTips.push('Full-length trousers or denim with wind-resistant weave.');
    gearRecommendations.push('Light windbreaker or structured autumn coat');
    gearRecommendations.push('Compact umbrella just in case of passing drizzle');
  } else if (temp >= 0 && temp < 10) {
    clothingTips.push('Multi-tier insulation: thermal base layer, insulating fleece, and a down jacket.');
    clothingTips.push('Wool socks and insulated closed-toe boots.');
    gearRecommendations.push('Knit beanie or ear warmers');
    gearRecommendations.push('Touchscreen-compatible insulated gloves');
    gearRecommendations.push('Thermos with warm beverage');
  } else {
    clothingTips.push('Heavy alpine-grade parka with sealed cuffs and synthetic/down fill.');
    clothingTips.push('Fleece-lined thermal base layers and wind-blocking waterproof trousers.');
    gearRecommendations.push('Heavyweight wool mittens and fleece scarf');
    gearRecommendations.push('Traction crampons or slip-resistant winter treads');
  }

  // Precipitation modifications
  if (isRainingOrWet) {
    gearRecommendations.unshift('Durable water-repellent umbrella with wind vents');
    gearRecommendations.push('Gore-Tex or treated waterproof footwear');
    travelAdvisory = 'Slick pavement and lowered traction. Allow extra braking distance for vehicles and caution on tiled pedestrian walkways.';
    if (condition.category === 'thunderstorm') {
      travelAdvisory = 'Hazardous electrical activity. Seek certified indoor shelter immediately; avoid tall trees and open bodies of water.';
    }
  }

  if (wind > 30) {
    gearRecommendations.push('Windproof outer shell with storm collar');
    if (!isRainingOrWet) {
      travelAdvisory = 'Strong crosswinds. Two-wheel transit (bicycles/motorcycles) may experience sudden side gusts.';
    }
  }

  // Activities Categorization
  if (isRainingOrWet || isSevere) {
    outdoorActivities.push({
      name: 'Outdoor Running & Jogging',
      category: 'outdoor',
      status: 'not-recommended',
      reason: 'Wet pavements heighten slip risk and rain chills core body temperature quickly.',
      iconName: 'Footprints',
    });
    outdoorActivities.push({
      name: 'Open-Air Dining & Terraces',
      category: 'outdoor',
      status: 'not-recommended',
      reason: 'Precipitation compromises outdoor seating and ambient dining comfort.',
      iconName: 'Coffee',
    });
    outdoorActivities.push({
      name: 'Cycling & Commuter Biking',
      category: 'outdoor',
      status: 'caution',
      reason: 'Reduced wheel grip and water spray; require full mudguards and waterproof gear.',
      iconName: 'Bike',
    });

    indoorActivities.push({
      name: 'Museums & Art Galleries',
      category: 'indoor',
      status: 'ideal',
      reason: 'Immersive indoor climate-controlled spaces shielded from weather turbulence.',
      iconName: 'Building',
    });
    indoorActivities.push({
      name: 'Indoor Strength & Gym Sessions',
      category: 'indoor',
      status: 'ideal',
      reason: 'Controlled temperature environment to fulfill training regimens safely.',
      iconName: 'Dumbbell',
    });
    indoorActivities.push({
      name: 'Artisan Cafes & Specialty Roasters',
      category: 'indoor',
      status: 'recommended',
      reason: 'Warm, cozy atmosphere with hot beverages tailored for stormy afternoons.',
      iconName: 'CupSoda',
    });
    indoorActivities.push({
      name: 'Cooking & Home Culinary Projects',
      category: 'indoor',
      status: 'recommended',
      reason: 'Inviting home ambiance ideal for slow-cooked dishes or baking.',
      iconName: 'Utensils',
    });
  } else {
    // Dry or mostly clear weather
    if (temp >= 15 && temp <= 27 && wind < 30) {
      outdoorActivities.push({
        name: 'Distance Running & Park Trails',
        category: 'outdoor',
        status: 'ideal',
        reason: 'Optimal aerobic conditions with low thermal strain and dry footing.',
        iconName: 'Footprints',
      });
      outdoorActivities.push({
        name: 'Road Cycling & Scenic Tours',
        category: 'outdoor',
        status: 'ideal',
        reason: 'Clean asphalt contact and steady tail/cross winds within comfortable margins.',
        iconName: 'Bike',
      });
      outdoorActivities.push({
        name: 'Park Picnics & Open-Air Gatherings',
        category: 'outdoor',
        status: 'ideal',
        reason: 'Dry turf and pleasant ambient sunshine encourage outdoor leisure.',
        iconName: 'TreePine',
      });
      outdoorActivities.push({
        name: 'Outdoor Photography & Sightseeing',
        category: 'outdoor',
        status: 'recommended',
        reason: 'Natural atmospheric lighting creates crisp contrast and shadow detail.',
        iconName: 'Camera',
      });
    } else if (temp > 27) {
      outdoorActivities.push({
        name: 'Water Sports & Shaded Pool Leisure',
        category: 'outdoor',
        status: 'ideal',
        reason: 'Helps regulate core body temperature during elevated heat indices.',
        iconName: 'Waves',
      });
      outdoorActivities.push({
        name: 'Midday Running / Intense Cardio',
        category: 'outdoor',
        status: 'caution',
        reason: 'Elevated temperature spikes dehydration rate; reschedule for dawn or dusk.',
        iconName: 'Footprints',
      });
      outdoorActivities.push({
        name: 'Al Fresco Evening Dining',
        category: 'outdoor',
        status: 'recommended',
        reason: 'Cooling evening breeze provides comfortable open-air dining.',
        iconName: 'Wine',
      });
    } else {
      // Crisp cold dry weather
      outdoorActivities.push({
        name: 'Crisp Nature Walks & Hiking',
        category: 'outdoor',
        status: 'recommended',
        reason: 'Invigorating brisk air; maintain continuous movement to sustain warmth.',
        iconName: 'Compass',
      });
      outdoorActivities.push({
        name: 'Urban Architecture Walk',
        category: 'outdoor',
        status: 'recommended',
        reason: 'Easily paired with warm cafe stopovers along the pedestrian route.',
        iconName: 'Building2',
      });
    }

    indoorActivities.push({
      name: 'Co-Working & Focused Reading',
      category: 'indoor',
      status: 'recommended',
      reason: 'Ample daylight boosts circadian alertness and deep work productivity.',
      iconName: 'BookOpen',
    });
    indoorActivities.push({
      name: 'Boutique Shopping & Markets',
      category: 'indoor',
      status: 'recommended',
      reason: 'Flexible hybrid option hopping between indoor stores and walkable streets.',
      iconName: 'ShoppingBag',
    });
  }

  // Summary generation
  let overview = `Current conditions in this area register ${Math.round(temp)}°C with ${condition.label.toLowerCase()} and winds blowing at ${Math.round(wind)} km/h. `;
  if (isRainingOrWet) {
    overview += 'Active precipitation is underway. We strongly encourage leaning into indoor cultural or wellness activities, and packing rain-resistant outerwear.';
  } else if (outdoorScore >= 80) {
    overview += 'Outdoor comfort is at peak levels. Today is exceptionally suited for endurance workouts, open-air leisure, and al fresco recreation.';
  } else {
    overview += 'Conditions are generally workable with standard seasonal clothing adjustments.';
  }

  return {
    outdoorScore,
    ratingLabel,
    headline,
    overview,
    clothingTips,
    gearRecommendations,
    outdoorActivities,
    indoorActivities,
    travelAdvisory,
    bestTimeOfDay,
  };
}

export function formatDateLabel(isoDate: string, index: number): { dayName: string; formattedDate: string } {
  if (index === 0) {
    return { dayName: 'Today', formattedDate: new Date(isoDate + 'T12:00:00Z').toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) };
  }
  if (index === 1) {
    return { dayName: 'Tomorrow', formattedDate: new Date(isoDate + 'T12:00:00Z').toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) };
  }
  const date = new Date(isoDate + 'T12:00:00Z');
  return {
    dayName: date.toLocaleDateString(undefined, { weekday: 'short' }),
    formattedDate: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
  };
}
