import React from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudHail,
  Snowflake,
  Wind
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6', size = 24 }) => {
  switch (name) {
    case 'Sun':
      return <Sun className={className} size={size} />;
    case 'Moon':
      return <Moon className={className} size={size} />;
    case 'CloudSun':
      return <CloudSun className={className} size={size} />;
    case 'CloudMoon':
      return <CloudMoon className={className} size={size} />;
    case 'Cloud':
      return <Cloud className={className} size={size} />;
    case 'CloudFog':
      return <CloudFog className={className} size={size} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={className} size={size} />;
    case 'CloudRain':
      return <CloudRain className={className} size={size} />;
    case 'CloudLightning':
      return <CloudLightning className={className} size={size} />;
    case 'CloudHail':
      return <CloudHail className={className} size={size} />;
    case 'Snowflake':
      return <Snowflake className={className} size={size} />;
    default:
      return <Sun className={className} size={size} />;
  }
};
