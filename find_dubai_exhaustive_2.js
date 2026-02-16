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
    console.log('Searching countries 200-500 for Dubai...');
    for (let i = 200; i <= 500; i++) {
        const data = await fetchPath(`/getLocationNames/${i}`);
        if (data && data.toLowerCase().includes('dubai')) {
            console.log(`FOUND DUBAI in Country ID: ${i}`);
            try {
                const parsed = JSON.parse(data);
                if (parsed.cities) {
                    for (const [id, name] of Object.entries(parsed.cities)) {
                        if (name.toLowerCase().includes('dubai')) {
                            console.log(`CITY ID: ${id} - ${name}`);
                        }
                    }
                }
            } catch (e) {
                console.log('Found match but failed to parse JSON.');
            }
            return;
        }
        if (i % 20 === 0) console.log(`Searched up to ${i}`);
    }
    console.log('Search complete. Dubai not found in countries 200-500.');
}

run();
