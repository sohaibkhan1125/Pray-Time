const https = require('https');

const RAPID_API_KEY = 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564';
const RAPID_API_HOST = 'prayer-times-api1.p.rapidapi.com';

const testPaths = [
    '/getLocationNames/ae',
    '/getLocationNames/uae',
    '/getLocationNames/united-arab-emirates',
    '/getCountries',
    '/getAllCountries'
];

async function testPath(path) {
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
                console.log(`--- ${path} ---`);
                console.log(data.substring(0, 500)); // Show first 500 chars
                resolve();
            });
        }).on('error', (err) => {
            console.error(`Error for ${path}:`, err);
            resolve();
        });
    });
}

async function run() {
    for (const path of testPaths) {
        await testPath(path);
    }
}

run();
