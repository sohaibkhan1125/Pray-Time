const fs = require('fs');

const rawBuffer = fs.readFileSync('all_locations_tr.json');
const content = rawBuffer.toString('utf8').replace(/^\uFEFF/, ''); // Remove BOM if present

const data = JSON.parse(content);

const emirates = [
    { name: 'Abu Dhabi', pattern: 'abu dhabi' },
    { name: 'Dubai', pattern: 'dubai' },
    { name: 'Ajman', pattern: 'acman' }, // Based on previously seen 'Acman'
    { name: 'Fujairah', pattern: 'fujairah' },
    { name: 'Füceyre', pattern: 'füceyre' },
    { name: 'Ras Al Khaimah', pattern: 'ras al' },
    { name: 'Sharjah', pattern: 'şarika' }, // Based on previously seen 'Şarika'
    { name: 'Umm Al Quwain', pattern: 'quwain' },
    { name: 'Umm Al Quwain', pattern: 'kayveyn' }
];

console.log('Searching for UAE Emirates in Cities/States...');

const results = {};

for (const [id, name] of Object.entries(data.cities)) {
    const lowerName = name.toLowerCase();
    for (const emirate of emirates) {
        if (lowerName.includes(emirate.pattern)) {
            if (!results[emirate.name]) results[emirate.name] = [];
            results[emirate.name].push({ id, name });
        }
    }
}

for (const [id, name] of Object.entries(data.states)) {
    const lowerName = name.toLowerCase();
    for (const emirate of emirates) {
        if (lowerName.includes(emirate.pattern)) {
            if (!results[emirate.name]) results[emirate.name] = [];
            results[emirate.name].push({ id, name, type: 'State' });
        }
    }
}

console.log(JSON.stringify(results, null, 2));
