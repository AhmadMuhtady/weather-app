import {
	Cloud,
	Sun,
	Moon,
	CloudMoon,
	CloudRain,
	CloudDrizzle,
	CloudSnow,
	Wind,
	CloudFog,
	Droplets,
} from 'lucide-react';

import WeatherDetails from './WeatherDetails';
import { useState } from 'react';

const WeatherCard = ({ weather }) => {
	const [isDetailsVisible, setIsDetailsVisible] = useState(false);

	const cityName = weather?.name;
	const countryName = weather?.sys?.country;
	const temp = Math.round(weather?.main?.temp);
	const feelsLike = Math.round(weather?.main?.feels_like);
	const description = weather?.weather[0]?.description;
	const humidity = weather?.main?.humidity;

	const getCurrentCityTime = () => {
		if (!weather || !weather.timezone) return '';

		const now = new Date();
		const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
		const cityTime = new Date(utcTime + weather.timezone * 1000);

		return cityTime.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
	};

	const formatted = getCurrentCityTime();

	const isNight = () => {
		const now = Math.floor(Date.now() / 1000);
		const sunrise = weather?.sys?.sunrise;
		const sunset = weather?.sys?.sunset;
		return now < sunrise || now > sunset;
	};

	const getWeatherIcon = () => {
		const condition = weather?.weather[0]?.main?.toLowerCase();
		const night = isNight();
		const size = 70;

		if (night) {
			switch (condition) {
				case 'clear':
					return <Moon size={size} className="text-yellow-200" />;
				case 'clouds':
					return <CloudMoon size={size} className="text-slate-200" />;
				case 'rain':
					return <CloudRain size={size} className="text-cyan-300" />;
				case 'drizzle':
					return <CloudDrizzle size={size} className="text-blue-300" />;
				case 'snow':
					return <CloudSnow size={size} className="text-blue-100" />;
				case 'mist':
				case 'fog':
				case 'haze':
					return <CloudFog size={size} className="text-slate-300" />;
				default:
					return <Wind size={size} className="text-teal-300" />;
			}
		}

		switch (condition) {
			case 'clear':
				return <Sun size={size} className="text-yellow-400" />;
			case 'clouds':
				return <Cloud size={size} className="text-slate-300" />;
			case 'rain':
				return <CloudRain size={size} className="text-blue-400" />;
			case 'drizzle':
				return <CloudDrizzle size={size} className="text-cyan-400" />;
			case 'snow':
				return <CloudSnow size={size} className="text-blue-200" />;
			case 'mist':
			case 'fog':
			case 'haze':
				return <CloudFog size={size} className="text-slate-400" />;
			default:
				return <Wind size={size} className="text-teal-400" />;
		}
	};

	return (
		<div className="relative">
			<div className="max-w-[500px] min-h-[470px] bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-w-[100px]">
				{/* Header */}
				<div className="flex justify-between items-start mb-6">
					<div>
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-1">
							{cityName}
						</h1>
						<p className="text-white/80 text-lg">{countryName}</p>
					</div>
					<div className="text-right">
						<p className="text-white/70 text-sm">{formatted}</p>
					</div>
				</div>

				{/* Main Display */}
				<div className="flex items-center justify-between gap-6 mb-6">
					<div className="flex-shrink-0">{getWeatherIcon()}</div>

					<div className="text-right flex-shrink-0">
						<div className="flex items-start justify-end">
							<span className="text-7xl md:text-8xl font-black text-white leading-none">
								{temp}
							</span>
							<span className="text-3xl md:text-4xl font-bold text-white/90 mt-2">
								°C
							</span>
						</div>
						<p className="text-white/80 text-lg mt-2">
							Feels like {feelsLike}°C
						</p>
					</div>
				</div>

				{/* Description & Humidity */}
				<div className="flex justify-between items-center py-4 border-t border-white/20 mb-4">
					<p className="text-2xl text-white capitalize font-semibold">
						{description}
					</p>

					<div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
						<Droplets className="text-cyan-300" size={20} />
						<span className="text-white text-lg font-bold">{humidity}%</span>
					</div>
				</div>

				{/* Toggle Button */}
			</div>
		</div>
	);
};

export default WeatherCard;
