const RAPID_API_KEY = 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564';
const RAPID_API_HOST = 'prayer-times-api1.p.rapidapi.com';

const headers = {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': RAPID_API_HOST
};

export const fetchPrayerTimes = async (locationId) => {
    try {
        const response = await fetch(`https://${RAPID_API_HOST}/getTimes/${locationId}`, {
            method: 'GET',
            headers
        });
        if (!response.ok) throw new Error('Failed to fetch prayer times');
        return await response.json();
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        throw error;
    }
};

export const fetchLocations = async () => {
    try {
        const response = await fetch(`https://${RAPID_API_HOST}/getLocationNames/tr`, {
            method: 'GET',
            headers
        });
        if (!response.ok) throw new Error('Failed to fetch locations');
        return await response.json();
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};
