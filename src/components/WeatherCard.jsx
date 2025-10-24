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
		const now = new Date();
		const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
		const cityTime = new Date(utcTime + weather.timezone * 1000);

		return cityTime.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
	};

	const formatted = getCurrentCityTime();

	// Dynamic background based on weather
	// Check if it's night time
	const isNight = () => {
		const now = Math.floor(Date.now() / 1000); // Current time in Unix
		const sunrise = weather?.sys?.sunrise;
		const sunset = weather?.sys?.sunset;
		return now < sunrise || now > sunset;
	};

	// Dynamic background based on weather AND time of day
	const getWeatherGradient = () => {
		const condition = weather?.weather[0]?.main?.toLowerCase();
		const night = isNight();

		if (night) {
			switch (condition) {
				case 'clear':
					return 'from-indigo-900 via-purple-900 to-blue-900'; // Clear night sky
				case 'clouds':
					return 'from-slate-800 via-gray-900 to-zinc-900'; // Cloudy night
				case 'rain':
				case 'drizzle':
					return 'from-slate-900 via-blue-950 to-indigo-950'; // Rainy night
				case 'snow':
					return 'from-slate-700 via-blue-900 to-gray-900'; // Snowy night
				default:
					return 'from-slate-900 via-purple-950 to-indigo-950'; // Default night
			}
		}

		// Day time colors
		switch (condition) {
			case 'clear':
				return 'from-orange-400 via-yellow-300 to-amber-500';
			case 'clouds':
				return 'from-gray-400 via-slate-500 to-gray-600';
			case 'rain':
				return 'from-blue-500 via-indigo-600 to-blue-700';
			case 'drizzle':
				return 'from-blue-400 via-cyan-500 to-teal-600';
			case 'snow':
				return 'from-blue-200 via-slate-300 to-gray-400';
			default:
				return 'from-purple-400 via-pink-500 to-rose-500';
		}
	};

	const getWeatherIcon = () => {
		const condition = weather?.weather[0]?.main?.toLowerCase();
		const night = isNight();

		// Night icons - different colors!
		if (night) {
			switch (condition) {
				case 'clear':
					return <Moon size={120} className="text-blue-200 drop-shadow-2xl" />;
				case 'clouds':
					return (
						<CloudMoon size={120} className="text-slate-300 drop-shadow-2xl" />
					);
				case 'rain':
					return (
						<CloudRain size={120} className="text-blue-400 drop-shadow-2xl" />
					);
				case 'drizzle':
					return (
						<CloudDrizzle
							size={120}
							className="text-cyan-400 drop-shadow-2xl"
						/>
					);
				case 'snow':
					return (
						<CloudSnow size={120} className="text-blue-200 drop-shadow-2xl" />
					);
				case 'mist':
				case 'fog':
				case 'haze':
					return (
						<CloudFog size={120} className="text-slate-400 drop-shadow-2xl" />
					);
				default:
					return <Wind size={120} className="text-teal-400 drop-shadow-2xl" />;
			}
		}

		// Day icons (your existing ones)
		switch (condition) {
			case 'clear':
				return <Sun size={120} className="text-yellow-300 drop-shadow-2xl" />;
			case 'clouds':
				return <Cloud size={120} className="text-gray-300 drop-shadow-2xl" />;
			case 'rain':
				return (
					<CloudRain size={120} className="text-blue-300 drop-shadow-2xl" />
				);
			case 'drizzle':
				return (
					<CloudDrizzle size={120} className="text-cyan-300 drop-shadow-2xl" />
				);
			case 'snow':
				return (
					<CloudSnow size={120} className="text-blue-100 drop-shadow-2xl" />
				);
			case 'mist':
			case 'fog':
			case 'haze':
				return (
					<CloudFog size={120} className="text-slate-300 drop-shadow-2xl" />
				);
			default:
				return <Wind size={120} className="text-teal-300 drop-shadow-2xl" />;
		}
	};

	return (
		<div className="relative overflow-hidden rounded-4xl">
			{/* Animated background gradient */}
			<div
				className={`absolute inset-0 bg-gradient-to-br ${getWeatherGradient()} opacity-20 blur-3xl animate-pulse`}
			></div>

			<div className="relative backdrop-blur-2xl bg-white/10 rounded-[2.5rem] p-10 border border-white/30 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-500 hover:scale-[1.02] rounded-4xl">
				{/* Header */}
				<div className="flex justify-between items-start mb-5">
					<div className="space-y-1">
						<h1 className="text-5xl font-black text-white drop-shadow-lg tracking-tight">
							{cityName}
						</h1>
						<p className="text-white/80 text-xl font-medium">{countryName}</p>
					</div>
					<div className="text-right">
						<p className="text-white/60 text-sm font-medium">{formatted}</p>
					</div>
				</div>

				{/* Main weather display - side by side */}
				<div className="flex items-center justify-between gap-9 my-5">
					{/* Icon with floating animation */}
					<div className="animate-bounce-slow">{getWeatherIcon()}</div>

					{/* Temperature - HUGE and bold */}
					<div className="text-right">
						<div className="flex items-start">
							<span className="text-[140px] font-black text-white leading-none drop-shadow-2xl">
								{temp}
							</span>
							<span className="text-5xl font-bold text-white/80 mt-4">°C</span>
						</div>
						<p className="text-white/70 text-2xl mt-4 font-medium">
							Feels like {feelsLike}°C
						</p>
					</div>
				</div>
				<button
					onClick={() => setIsDetailsVisible(!isDetailsVisible)}
					className="w-full mt-6 mb-4 backdrop-blur-lg bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl border border-white/20 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
				>
					{isDetailsVisible ? (
						<>
							<span>Show Less</span>
							<span className="text-xl">▲</span>
						</>
					) : (
						<>
							<span>Show More Details</span>
							<span className="text-xl">▼</span>
						</>
					)}
				</button>

				<div
					className={`transition-all duration-200 overflow-hidden ${
						isDetailsVisible
							? 'max-h-[1000px] opacity-100'
							: 'max-h-0 opacity-0'
					}`}
				>
					<WeatherDetails weather={weather} />
				</div>

				{/* Bottom section */}
				<div className="flex justify-between items-center pt-6 border-t border-white/20">
					<p className="text-3xl text-white capitalize font-semibold drop-shadow-md">
						{description}
					</p>

					<div className="flex items-center gap-3 backdrop-blur-xl bg-white/10 px-6 py-3 rounded-full border border-white/20">
						<Droplets className="text-blue-300" size={28} />
						<span className="text-white text-2xl font-bold">{humidity}%</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
