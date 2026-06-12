const http = require('http');

const city = 'Lagos';

// building the request options manually
const options = {
  hostname: 'wttr.in',
  path: '/' + city + '?format=j1',
  method: 'GET',
  port: 80,
  headers: {
    'User-Agent': 'weather-cli/1.0'
  }
};

// log what we're sending before it goes out
console.log('--- sending request ---');
console.log('method:', options.method);
console.log('host:', options.hostname);
console.log('path:', options.path);
console.log('port:', options.port);
console.log('-----------------------');

const req = http.request(options, function(res) {

  // log what came back
  console.log('\n--- response received ---');
  console.log('status:', res.statusCode, res.statusMessage);
  console.log('content-type:', res.headers['content-type']);
  console.log('transfer-encoding:', res.headers['transfer-encoding']);
  console.log('-------------------------');

  let body = '';

  // data comes in chunks over TCP - collect them
  res.on('data', function(chunk) {
    console.log('chunk received, size:', chunk.length, 'bytes');
    body += chunk;
  });

  res.on('end', function() {
    console.log('\n--- parsing response body ---');
    const data = JSON.parse(body);
    const now = data.current_condition[0];

    console.log('\ncity      :', city);
    console.log('temp      :', now.temp_C + 'c');
    console.log('feels like:', now.FeelsLikeC + 'c');
    console.log('condition :', now.weatherDesc[0].value);
    console.log('humidity  :', now.humidity + '%');
    console.log('wind      :', now.windspeedKmph + ' km/h');
  });

});

req.on('error', function(err) {
  console.log('something went wrong:', err.message);
});

req.end();