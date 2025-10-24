import {
	Wind,
	Gauge,
	Eye,
	Cloud,
	Sunrise,
	Sunset,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

const WeatherDetails = ({ weather }) => {
	const wind = weather?.wind?.speed;
	const pressure = weather?.main?.pressure;
	const visibility = (weather?.visibility / 1000).toFixed(1); // Convert to km
	const clouds = weather?.clouds?.all;
	const sunrise = new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString();
	const sunset = new Date(weather?.sys?.sunset * 1000).toLocaleTimeString();
	const tempMax = Math.round(weather?.main?.temp_max);
	const tempMin = Math.round(weather?.main?.temp_min);
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 mb-3">
			<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
				<div className="flex items-center gap-2 mb-2">
					<Wind size={20} className="text-cyan-300" />
					<p className="text-white/70 text-sm font-medium">Wind</p>
				</div>
				<p className="text-white text-2xl font-bold">{wind} km/h</p>
			</div>

			<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
				<div className="flex items-center gap-2 mb-2">
					<Gauge size={20} className="text-cyan-300" />
					<p className="text-white/70 text-sm font-medium">pressure</p>
				</div>
				<p className="text-white text-2xl font-bold">{pressure} hPa</p>
			</div>

			<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
				<div className="flex items-center gap-2 mb-2">
					<Eye size={20} className="text-cyan-300" />
					<p className="text-white/70 text-sm font-medium">visibility</p>
				</div>
				<p className="text-white text-2xl font-bold">{visibility} km</p>
			</div>

			<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
				<div className="flex items-center gap-2 mb-2">
					<Cloud size={20} className="text-cyan-300" />
					<p className="text-white/70 text-sm font-medium">clouds</p>
				</div>
				<p className="text-white text-2xl font-bold">{clouds} %</p>
			</div>

			<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
				<div className="flex items-center gap-2 mb-2">
					<Sunrise size={20} className="text-cyan-300" />
					<p className="text-white/70 text-sm font-medium">sunrise</p>
				</div>
				<p className="text-white text-2xl font-bold">{sunrise}</p>
			</div>

			<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
				<div className="flex items-center gap-2 mb-2">
					<Sunset size={20} className="text-cyan-300" />
					<p className="text-white/70 text-sm font-medium">sunset</p>
				</div>
				<p className="text-white text-2xl font-bold">{sunset}</p>
			</div>

			<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
				<div className="flex items-center gap-2 mb-2">
					<TrendingUp size={20} className="text-cyan-300" />
					<p className="text-white/70 text-sm font-medium">Max Temperature</p>
				</div>
				<p className="text-white text-2xl font-bold">{tempMax}°C</p>
			</div>

			<div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
				<div className="flex items-center gap-2 mb-2">
					<TrendingDown size={20} className="text-cyan-300" />
					<p className="text-white/70 text-sm font-medium">Min Temperature</p>
				</div>
				<p className="text-white text-2xl font-bold">{tempMin}°C</p>
			</div>
		</div>
	);
};

export default WeatherDetails;
