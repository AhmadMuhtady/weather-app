import {
	Cloud,
	Sun,
	CloudRain,
	CloudDrizzle,
	CloudSnow,
	Wind,
	CloudFog,
} from 'lucide-react';

const ForecastCard = ({ weather }) => {
	const temp = Math.round(weather?.main?.temp);
	const description = weather?.weather[0]?.description;

	const date = new Date(weather.dt * 1000);
	const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
	const dateStr = date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	});

	const getWeatherIcon = () => {
		const condition = weather?.weather[0]?.main?.toLowerCase();
		const size = 40; // Slightly smaller for better fit

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
		<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-200 min-w-[140px]">
			{/* Day name */}
			<p className="text-white font-bold text-base mb-0.5">{dayName}</p>

			{/* Date */}
			<p className="text-white/70 text-xs mb-3">{dateStr}</p>

			{/* Weather icon - Centered */}
			<div className="flex justify-center my-3">{getWeatherIcon()}</div>

			{/* Temperature */}
			<p className="text-white text-2xl font-bold text-center mb-1.5">
				{temp}°
			</p>

			{/* Description */}
			<p className="text-white/70 text-xs capitalize text-center leading-tight">
				{description}
			</p>
		</div>
	);
};

export default ForecastCard;
