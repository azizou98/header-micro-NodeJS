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

app.use(requestedlanguages({
  languages: ['en', 'fr', 'es'], // Supported languages
  default: 'en', // Default language
}));


// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
 const ip = req.socket.remoteAddress;
 const prefferredlanguages = req.languages;
 console.log('ip address' + ip +' w langages ' + prefferredlanguages)
 res.json({
     ip : ip,
     languages : 'list' + prefferredlanguages
  });
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
