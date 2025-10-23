const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (city) => {
	try {
		const res = await fetch(
			`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
		);

		if (!res.ok) {
			if (res.status === 404) {
				throw new Error('City not found');
			}
			if (res.status === 401) {
				throw new Error('Invalid API key');
			}
			throw new Error('Failed to fetch weather data');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Weather API Error:', error.message);
		throw error;
	}
};

export const getForecast = async (city) => {
	try {
		const res = await fetch(
			`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
		);

		if (!res.ok) {
			if (res.status === 404) {
				throw new Error('City not found');
			}
			if (res.status === 401) {
				throw new Error('Invalid API key');
			}
			throw new Error('Failed to fetch weather data');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Weather API Error:', error.message);
		throw error;
	}
};
