// index.js

// init project
var express = require('express');
var app = express();

const dayjs = require('dayjs');
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});

// timestamp endpoint
app.get("/api/:date?", function (req, res) {
  const userdate = req.params.date;
  const possibleDateFormats = ["YYYY", "YYYY-MM-DD", "DD-MM-YYYY", "X", "x"];
  
  if (userdate) {
    if (dayjs(userdate).isValid()) {
      res.json({
        unix: dayjs.unix(userdate/1000, possibleDateFormats, 'es').valueOf(),
        utc: dayjs.unix(userdate/1000).toString(),
      });
    } 
    else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    const now = dayjs();
    res.json({
      unix: dayjs.unix(now/1000, possibleDateFormats, 'es').valueOf(),
      utc: dayjs.unix(now/1000).toString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
