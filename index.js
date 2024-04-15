// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var requestedlanguages = require('express-request-language')
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('trust proxy',1);

app.use(requestedlanguages({
  languages: ['en', 'fr', 'ar'], // Supported languages
  default: 'ar', // Default language
}));


// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

// your first API endpoint...
app.get('/api/whoami', function (req, res) {

  // get the ip addresss 
 const ip = getClientIp(req);
 
 // get the langagues 
 const acceptLanguageHeader = req.headers['accept-language'];
 const languages = acceptLanguageHeader
     .split(',')
     .map(lang => {
         const [language, weight] = lang.split(';q=');
         return {
             language,
             weight: weight ? parseFloat(weight) : 1.0, // Default weight is 1.0
         };
     })
     .sort((a, b) => b.weight - a.weight) // Sort by weight (highest to lowest)
     .map(langObj => `${langObj.language};q=${langObj.weight}`)
     .join(',');

 const prefferredlanguages = languages;
 console.log('ip address v4' + ip +' w langages ' + prefferredlanguages)
 res.json({
     ip : ip,
     languages : prefferredlanguages
  });
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
