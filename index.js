// index.js

// init project
var express = require('express');
var app = express();

const dayjs = require('dayjs');

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

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
});

// timestamp endpoint
app.get("/api/:date?", function (req, res) {
  let userdate = req.params.date;
  const possibleDateFormats = [
    "YYYY-MM-DD",
    "DD-MM-YYYY",
    "YYYY",
    "YYYY-MM-DD HH:mm:ss",
    "MM/DD/YY H:mm:ss A Z",
    "X", "x"];
  
  if (userdate) {
    userdate = decodeURIComponent(req.params.date)
    if (!isNaN(userdate)) {
      const date = dayjs(Number(userdate));
      res.json({
        unix: date.valueOf(),
        utc: date.utc().toString(),
      });
    } else {
      if (dayjs(userdate, possibleDateFormats).isValid()) {
        res.json({
          unix: dayjs(userdate, possibleDateFormats).valueOf(),
          utc: dayjs(userdate, possibleDateFormats).utc().toString(),
        });
      } else {
        res.json({ error: "Invalid Date" });
      }
    }
  } else {
    const now = dayjs();
    res.json({
      unix: now.unix(),
      utc: now.utc().toString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
