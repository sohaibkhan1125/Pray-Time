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
    console.log('Searching for Dubai ID...');
    // We saw id 1, 2, 3 in the user snippet. Let's try 1 to 250.
    for (let i = 1; i <= 250; i++) {
        const data = await fetchPath(`/getLocationNames/${i}`);
        if (data && (data.includes('Dubai') || data.includes('DUBAI') || data.includes('United Arab Emirates'))) {
            console.log(`FOUND UAE/Dubai at country ID: ${i}`);
            console.log(data);
            return;
        }
        if (i % 20 === 0) console.log(`Searched ${i} countries...`);
    }
}

run();
