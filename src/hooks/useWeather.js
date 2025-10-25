import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast } from '../utils/weatherApi';

export const useWeather = (city) => {
	const [weather, setWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!city) {
			setLoading(false);
			return;
		}

		const fetchWeatherData = async () => {
			setLoading(true);
			setError(null);
			try {
				const [CurrentWeatherData, forecastData] = await Promise.all([
					getCurrentWeather(city),
					getForecast(city),
				]);

				setWeather(CurrentWeatherData);
				setForecast(forecastData);
				console.log(forecastData);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchWeatherData();
	}, [city]);

	return { weather, forecast, loading, error };
};
