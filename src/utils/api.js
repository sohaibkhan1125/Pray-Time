const ISLAMIC_API_KEY = '2hHEc96PJ9XeuDXMMLwa6BGgItIJ3rTCfANbjGvTmSyVp3Zn';
const BASE_URL = 'https://islamicapi.com/api/v1/prayer-time/';

export const fetchPrayerTimes = async (params) => {
    const { lat, lon, method = '3', school = '1' } = params;
    try {
        const queryParams = new URLSearchParams({
            lat,
            lon,
            method,
            school,
            api_key: ISLAMIC_API_KEY
        });

        const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch prayer times');

        const data = await response.json();
        if (data.status === 'success') {
            return data.data;
        } else {
            throw new Error(data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        throw error;
    }
};

/**
 * Search for locations using Nominatim OpenStreetMap API
 * This provides lat/lon for the IslamicAPI
 */
export const searchLocations = async (query) => {
    if (!query || query.length < 2) return [];

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
        );

        if (!response.ok) throw new Error('Failed to fetch locations');

        const data = await response.json();
        return data.map(item => ({
            id: item.place_id,
            name: item.display_name,
            lat: item.lat,
            lon: item.lon,
            fullDisplayName: item.display_name
        }));
    } catch (error) {
        console.error('Error searching locations:', error);
        return [];
    }
};

