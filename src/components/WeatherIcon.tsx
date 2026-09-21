import React from 'react';
import {
  Sun,
  SunMedium,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
  Wind,
  Footprints,
  Coffee,
  Bike,
  Building,
  Dumbbell,
  CupSoda,
  Utensils,
  TreePine,
  Camera,
  Waves,
  Wine,
  Compass,
  Building2,
  BookOpen,
  ShoppingBag,
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Sun':
      return <Sun className={className} />;
    case 'SunMedium':
      return <SunMedium className={className} />;
    case 'Moon':
      return <Moon className={className} />;
    case 'CloudSun':
      return <CloudSun className={className} />;
    case 'CloudMoon':
      return <CloudMoon className={className} />;
    case 'Cloud':
      return <Cloud className={className} />;
    case 'CloudFog':
      return <CloudFog className={className} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={className} />;
    case 'CloudRain':
      return <CloudRain className={className} />;
    case 'Snowflake':
      return <Snowflake className={className} />;
    case 'CloudLightning':
      return <CloudLightning className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Footprints':
      return <Footprints className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Bike':
      return <Bike className={className} />;
    case 'Building':
      return <Building className={className} />;
    case 'Dumbbell':
      return <Dumbbell className={className} />;
    case 'CupSoda':
      return <CupSoda className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'TreePine':
      return <TreePine className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Waves':
      return <Waves className={className} />;
    case 'Wine':
      return <Wine className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    default:
      return <CloudSun className={className} />;
  }
};
