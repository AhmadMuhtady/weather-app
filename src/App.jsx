import { useWeather } from './hooks/useWeather';

import Spinner from './components/Spinner';

const App = () => {
	const { weather, forecast, loading, error } = useWeather('Beirut');

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
				<div className="text-white text-2xl">
					<Spinner />
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
			<div className="text-white"></div>
		</div>
	);
};

export default App;
