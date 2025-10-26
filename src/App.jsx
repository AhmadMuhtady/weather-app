import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import Spinner from './components/Spinner';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import WeatherDetails from './components/WeatherDetails';

const App = () => {
	const [city, setCity] = useState('Beirut');
	const [searchInput, setSearchInput] = useState('');

	const onSearchChange = (e) => {
		setSearchInput(e.target.value);
	};

	const onSearchClick = () => {
		if (searchInput.length === 0) {
			alert('Please Enter a City');
		}
		setCity(searchInput);
	};

	const { weather, forecast, loading, error } = useWeather(city);

	const getPageGradient = () => {
		if (!weather) return 'from-sky-400 via-blue-500 to-indigo-600';

		const condition = weather?.weather[0]?.main?.toLowerCase();
		const now = Math.floor(Date.now() / 1000);
		const isNight = now < weather?.sys?.sunrise || now > weather?.sys?.sunset;

		if (isNight) {
			switch (condition) {
				case 'clear':
					return 'from-indigo-950 via-purple-800 to-pink-900'; // Vibrant night sky
				case 'clouds':
					return 'from-slate-900 via-indigo-900 to-purple-900'; // Rich cloudy night
				case 'rain':
				case 'drizzle':
					return 'from-blue-950 via-indigo-900 to-cyan-950'; // Electric rainy night
				case 'snow':
					return 'from-slate-800 via-blue-900 to-indigo-950'; // Snowy night
				default:
					return 'from-purple-950 via-indigo-900 to-blue-950';
			}
		}

		// BRIGHT & ALIVE day colors
		switch (condition) {
			case 'clear':
				return 'from-sky-400 via-blue-400 to-cyan-300'; // Bright sunny sky
			case 'clouds':
				return 'from-slate-400 via-gray-400 to-blue-400'; // Soft cloudy with blue
			case 'rain':
				return 'from-blue-600 via-cyan-600 to-teal-700'; // Vibrant rainy
			case 'drizzle':
				return 'from-cyan-500 via-blue-500 to-indigo-600'; // Fresh drizzle
			case 'snow':
				return 'from-blue-300 via-cyan-200 to-sky-300'; // Bright snowy
			default:
				return 'from-violet-500 via-purple-500 to-fuchsia-600'; // Colorful default
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center">
				<Spinner color="white" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-pink-600 flex items-center justify-center">
				<div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30 shadow-2xl">
					<div className="text-white text-2xl font-bold">⚠️ {error}</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen bg-gradient-to-br ${getPageGradient()} transition-all duration-1000 p-6 md:p-10`}
		>
			{/* Animated gradient overlay */}
			<div className="fixed inset-0 z-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

			<div className="relative max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-10">
					<h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg mb-2 tracking-tight">
						SkyScope ☁️
					</h1>
					<p className="text-white/90 text-lg md:text-xl font-medium">
						Real-time weather at your fingertips
					</p>

					<SearchBar
						onClick={onSearchClick}
						onChange={onSearchChange}
						searchInput={searchInput}
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div>
						<WeatherCard weather={weather} />
					</div>
					<div className="space-y-6 max-w-3xl">
						<ForecastList forecast={forecast} />
						<WeatherDetails weather={weather} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
