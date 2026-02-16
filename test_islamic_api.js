const https = require('https');

const apiKey = '2hHEc96PJ9XeuDXMMLwa6BGgItIJ3rTCfANbjGvTmSyVp3Zn';
const lat = '51.5194682'; // London
const lon = '-0.1360365';
const method = '3';
const school = '1';

const url = `https://islamicapi.com/api/v1/prayer-time/?lat=${lat}&lon=${lon}&method=${method}&school=${school}&api_key=${apiKey}`;

console.log('Testing IslamicAPI with London coordinates (via https model)...');

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.status === 'success') {
                console.log('SUCCESS: Prayer times fetched successfully.');
                const times = parsed.data.times;
                console.log(`Fajr: ${times.Fajr}`);
                console.log(`Dhuhr: ${times.Dhuhr}`);
                console.log(`Asr: ${times.Asr}`);
                console.log(`Maghrib: ${times.Maghrib}`);
                console.log(`Isha: ${times.Isha}`);

                console.log('\nHijri Date:', parsed.data.date.hijri.date, `(${parsed.data.date.hijri.month.en})`);
                console.log('Qibla Direction:', parsed.data.qibla.direction.degrees, 'degrees');
            } else {
                console.error('API Error:', parsed.message || 'Unknown error');
            }
        } catch (e) {
            console.error('Failed to parse response:', e.message);
            console.log('Raw output:', data.substring(0, 200));
        }
    });
}).on('error', (err) => {
    console.error('Request failed:', err.message);
});
