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
		// Smaller size for forecast cards!
		const iconProps = { size: 48, className: 'drop-shadow-lg' };

		switch (condition) {
			case 'clear':
				return (
					<Sun {...iconProps} className="text-yellow-300 drop-shadow-lg" />
				);
			case 'clouds':
				return (
					<Cloud {...iconProps} className="text-gray-300 drop-shadow-lg" />
				);
			case 'rain':
				return (
					<CloudRain {...iconProps} className="text-blue-300 drop-shadow-lg" />
				);
			case 'drizzle':
				return (
					<CloudDrizzle
						{...iconProps}
						className="text-cyan-300 drop-shadow-lg"
					/>
				);
			case 'snow':
				return (
					<CloudSnow {...iconProps} className="text-blue-100 drop-shadow-lg" />
				);
			case 'mist':
			case 'fog':
			case 'haze':
				return (
					<CloudFog {...iconProps} className="text-slate-300 drop-shadow-lg" />
				);
			default:
				return <Wind {...iconProps} className="text-teal-300 drop-shadow-lg" />;
		}
	};

	return (
		<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
			{/* Day name - Bold */}
			<p className="text-white font-bold text-lg mb-1">{dayName}</p>

			{/* Date - Smaller, faded */}
			<p className="text-white/60 text-sm mb-4">{dateStr}</p>

			{/* Weather icon - Centered */}
			<div className="flex justify-center my-4">{getWeatherIcon()}</div>

			{/* Temperature - Big and centered */}
			<p className="text-white text-3xl font-bold text-center mb-2">{temp}°C</p>

			{/* Description - Small, centered, capitalized */}
			<p className="text-white/70 text-sm capitalize text-center">
				{description}
			</p>
		</div>
	);
};

export default ForecastCard;
