const http = require('http');

const CITY = 'Lagos';

const options = {
  hostname: 'wttr.in',
  path: `/${CITY}?format=j1`,
  method: 'GET',
  port: 80,
  headers: {
    'User-Agent': 'weather-cli/1.0'
  }
};

console.log('=== HTTP REQUEST ===');
console.log(`Method: ${options.method}`);
console.log(`Host: ${options.hostname}`);
console.log(`Path: ${options.path}`);
console.log('===================\n');

const req = http.request(options, (res) => {
  console.log('=== HTTP RESPONSE ===');
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Status Message: ${res.statusMessage}`);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  console.log('====================\n');

  let rawData = '';

  res.on('data', (chunk) => {
    rawData += chunk;
  });

  res.on('end', () => {
    const parsed = JSON.parse(rawData);
    const current = parsed.current_condition[0];
    console.log('=== WEATHER DATA ===');
    console.log(`City: ${CITY}`);
    console.log(`Temperature: ${current.temp_C}°C`);
    console.log(`Feels Like: ${current.FeelsLikeC}°C`);
    console.log(`Condition: ${current.weatherDesc[0].value}`);
    console.log(`Humidity: ${current.humidity}%`);
    console.log(`Wind Speed: ${current.windspeedKmph} km/h`);
    console.log('====================');
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.end();