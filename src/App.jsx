import { useWeather } from './hooks/useWeather';

import Spinner from './components/Spinner';

const App = () => {
	const { weather, forecast, loading, error } = useWeather('Beirut');

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
				<div className="text-white text-2xl">
					<Spinner color="white" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-red-500 flex items-center justify-center">
				<div className="text-white text-2xl">Error: {error}</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-8">
			<div className="text-white">
				<h1 className="text-4xl font-bold mb-4">{weather?.name}</h1>
				<p className="text-8xl font-bold">
					{Math.round(weather?.main?.temp)}°C
				</p>
				<p className="text-2xl capitalize mt-4">
					{weather?.weather[0]?.description}
				</p>
				<p className="text-xl mt-2">
					Feels like: {Math.round(weather?.main?.feels_like)}°C
				</p>
			</div>
		</div>
	);
};

export default App;
