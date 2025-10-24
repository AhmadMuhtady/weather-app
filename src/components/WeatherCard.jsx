import {
	Cloud,
	Sun,
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

	const date = new Date((weather.dt + weather.timezone) * 1000);
	const day = date.getDate();
	const month = date.toLocaleString('en-US', { month: 'short' });
	const year = date.getFullYear().toString().slice(-2);
	const time = date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
	const formatted = `${day}/${month}/${year} ${time}`;

	// Dynamic background based on weather
	const getWeatherGradient = () => {
		const condition = weather?.weather[0]?.main?.toLowerCase();
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
				<div className="flex justify-between items-start mb-8">
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
				<div className="flex items-center justify-between gap-12 my-10">
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
