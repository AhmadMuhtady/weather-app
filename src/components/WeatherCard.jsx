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

const WeatherCard = ({ weather }) => {
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
		const size = 100; // Bigger icon!

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
		<div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transition-all duration-200">
			{/* Header - More space */}
			<div className="flex justify-between items-start mb-10">
				<div>
					<h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
						{cityName}
					</h1>
					<p className="text-white/80 text-xl">{countryName}</p>
				</div>
				<div className="text-right">
					<p className="text-white/70 text-sm">{formatted}</p>
				</div>
			</div>

			{/* Main Display - Center everything */}
			<div className="flex flex-col items-center justify-center mb-10 space-y-8">
				{/* Icon */}
				<div>{getWeatherIcon()}</div>

				{/* Temperature */}
				<div className="text-center">
					<div className="flex items-start justify-center">
						<span className="text-8xl md:text-9xl font-black text-white leading-none">
							{temp}
						</span>
						<span className="text-4xl md:text-5xl font-bold text-white/90 mt-4">
							°C
						</span>
					</div>
					<p className="text-white/80 text-xl mt-4">Feels like {feelsLike}°C</p>
				</div>
			</div>

			{/* Description & Humidity */}
			<div className="flex justify-between items-center pt-6 border-t border-white/20">
				<p className="text-2xl text-white capitalize font-semibold">
					{description}
				</p>

				<div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full">
					<Droplets className="text-cyan-300" size={24} />
					<span className="text-white text-xl font-bold">{humidity}%</span>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
