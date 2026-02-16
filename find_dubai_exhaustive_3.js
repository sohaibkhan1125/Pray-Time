const https = require('https');

const RAPID_API_KEY = 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564';
const RAPID_API_HOST = 'prayer-times-api1.p.rapidapi.com';

async function fetchPath(path) {
    return new Promise((resolve) => {
        const options = {
            hostname: RAPID_API_HOST,
            path: path,
            headers: {
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            resolve(null);
        });
    });
}

async function run() {
    console.log('Searching countries 500-1000 for Dubai...');
    for (let i = 500; i <= 1000; i++) {
        const data = await fetchPath(`/getLocationNames/${i}`);
        if (data && (data.toLowerCase().includes('dubai') || data.toLowerCase().includes('emirates'))) {
            console.log(`FOUND MATCH in Country ID: ${i}`);
            console.log('DATA:', data);
            return;
        }
        if (i % 50 === 0) console.log(`Searched up to ${i}`);
    }
    console.log('Search complete. Dubai not found in countries 500-1000.');
}

run();
