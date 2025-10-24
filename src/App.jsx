import { useWeather } from './hooks/useWeather';
import Spinner from './components/Spinner';
import WeatherCard from './components/WeatherCard';

const App = () => {
	const { weather, forecast, loading, error } = useWeather('Beirut');

	// Dynamic background based on weather
	const getPageGradient = () => {
		if (!weather) return 'from-blue-400 to-purple-500';

		const condition = weather?.weather[0]?.main?.toLowerCase();
		const isNight = weather?.weather[0]?.icon?.includes('n'); // Night time check

		if (isNight) {
			return 'from-indigo-900 via-purple-900 to-pink-900'; // Night sky
		}

		switch (condition) {
			case 'clear':
				return 'from-blue-400 via-cyan-400 to-yellow-300'; // Sunny day
			case 'clouds':
				return 'from-slate-500 via-gray-500 to-zinc-600'; // Cloudy
			case 'rain':
				return 'from-slate-700 via-blue-800 to-indigo-900'; // Rainy
			case 'drizzle':
				return 'from-blue-500 via-slate-600 to-gray-700'; // Light rain
			case 'snow':
				return 'from-blue-200 via-slate-300 to-gray-400'; // Snowy
			case 'thunderstorm':
				return 'from-gray-900 via-slate-800 to-purple-900'; // Storm
			default:
				return 'from-purple-400 via-pink-500 to-rose-500'; // Default
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center transition-all duration-1000">
				<Spinner color="white" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-red-600 to-orange-700 flex items-center justify-center">
				<div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20">
					<div className="text-white text-2xl font-bold">⚠️ Error: {error}</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen bg-gradient-to-br rounded ${getPageGradient()} transition-all duration-1000 p-8`}
		>
			{/* Animated background overlay */}
			<div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded"></div>

			<div className="relative max-w-5xl mx-auto space-y-8">
				{/* Title/Logo */}
				<div className="text-center mb-8">
					<h1 className="text-6xl font-black text-white drop-shadow-2xl mb-2">
						SkyScope ☁️
					</h1>
					<p className="text-white/80 text-xl font-medium">
						Your Beautiful Weather Companion
					</p>
				</div>

				<WeatherCard weather={weather} />
			</div>
		</div>
	);
};

export default App;
