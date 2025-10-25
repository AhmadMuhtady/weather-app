import ForecastCard from './ForecastCard';

const ForecastList = ({ forecast }) => {
	const getDailyForecasts = () => {
		if (!forecast?.list) return [];

		const dailyMap = {};

		forecast.list.forEach((item) => {
			const date = new Date(item.dt * 1000);
			const dateKey = date.toISOString().split('T')[0];
			const hour = date.getHours();

			// Store the entry closest to noon (12:00)
			if (
				!dailyMap[dateKey] ||
				Math.abs(hour - 12) < Math.abs(dailyMap[dateKey].hour - 12)
			) {
				dailyMap[dateKey] = { ...item, hour };
			}
		});

		return Object.values(dailyMap).slice(0, 5);
	};

	const dailyForecasts = getDailyForecasts();

	if (dailyForecasts.length === 0) {
		return null;
	}

	return (
		<div>
			<h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
				5-Day Forecast
			</h2>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
				{dailyForecasts.map((day, index) => (
					<ForecastCard key={index} weather={day} />
				))}
			</div>
		</div>
	);
};

export default ForecastList;
