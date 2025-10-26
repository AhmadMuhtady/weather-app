import {
	Wind,
	Gauge,
	Eye,
	Cloud,
	Sunrise,
	Sunset,
	Thermometer,
} from 'lucide-react';

const WeatherDetails = ({ weather }) => {
	const wind = weather?.wind?.speed;
	const pressure = weather?.main?.pressure;
	const visibility = (weather?.visibility / 1000).toFixed(1);
	const clouds = weather?.clouds?.all;

	// Format time without seconds
	const sunrise = new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString(
		'en-US',
		{
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		}
	);
	const sunset = new Date(weather?.sys?.sunset * 1000).toLocaleTimeString(
		'en-US',
		{
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		}
	);

	const tempMax = Math.round(weather?.main?.temp_max);
	const tempMin = Math.round(weather?.main?.temp_min);

	// Stat card component for consistency
	const StatCard = ({ icon: Icon, label, value, color }) => (
		<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-200">
			<div className="flex items-center gap-2 mb-2">
				<Icon size={18} className={color} />
				<p className="text-white/80 text-xs font-medium uppercase tracking-wide">
					{label}
				</p>
			</div>
			<p className="text-white text-xl font-bold">{value}</p>
		</div>
	);

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
			<StatCard
				icon={Wind}
				label="Wind"
				value={`${wind} km/h`}
				color="text-cyan-400"
			/>

			<StatCard
				icon={Gauge}
				label="Pressure"
				value={`${pressure} hPa`}
				color="text-purple-400"
			/>

			<StatCard
				icon={Eye}
				label="Visibility"
				value={`${visibility} km`}
				color="text-blue-400"
			/>

			<StatCard
				icon={Cloud}
				label="Clouds"
				value={`${clouds}%`}
				color="text-slate-300"
			/>

			<StatCard
				icon={Sunrise}
				label="Sunrise"
				value={sunrise}
				color="text-orange-400"
			/>

			<StatCard
				icon={Sunset}
				label="Sunset"
				value={sunset}
				color="text-pink-400"
			/>

			<StatCard
				icon={Thermometer}
				label="Max Temp"
				value={`${tempMax}°C`}
				color="text-red-400"
			/>

			<StatCard
				icon={Thermometer}
				label="Min Temp"
				value={`${tempMin}°C`}
				color="text-blue-300"
			/>
		</div>
	);
};

export default WeatherDetails;
