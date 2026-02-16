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
    console.log('Fetching locations...');
    // The previous fetch used /tr. Let's see if we can get all by omitting it or using something else.
    // Actually, let's just search for Dubai in a loop of country IDs if needed.
    // But wait, what if I search for "Dubai" in the search query of the API? 
    // Is there a search endpoint?

    // Let's try the /tr response again and look for ALL cities.
    const data = await fetchPath('/getLocationNames/tr');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            if (parsed.cities) {
                for (const [id, name] of Object.entries(parsed.cities)) {
                    if (name.toLowerCase().includes('dubai')) {
                        console.log(`FOUND DUBAI: ${id} - ${name}`);
                        return;
                    }
                }
            }
        } catch (e) {
            console.error('Failed to parse JSON');
        }
    }
    console.log('Dubai not found in /tr response. Trying other IDs...');
}

run();
