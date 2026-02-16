const https = require('https');

const RAPID_API_KEY = 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564';
const RAPID_API_HOST = 'prayer-times-api1.p.rapidapi.com';

async function testCountry(id) {
    return new Promise((resolve) => {
        const options = {
            hostname: RAPID_API_HOST,
            path: `/getLocationNames/${id}`,
            headers: {
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (data && data.includes('DUBAI') || data.includes('United Arab Emirates')) {
                    console.log(`FOUND UAE/DUBAI at ID: ${id}`);
                    console.log(data.substring(0, 1000));
                }
                resolve();
            });
        }).on('error', (err) => {
            resolve();
        });
    });
}

async function run() {
    console.log('Searching for Dubai/UAE country ID...');
    for (let i = 1; i <= 300; i++) {
        await testCountry(i);
        if (i % 50 === 0) console.log(`Tested up to ${i}`);
    }
}

run();
