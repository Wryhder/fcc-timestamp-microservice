# Timestamp Microservice

This project implements a simple API that takes a date string as input and returns a JSON object with the corresponding Unix timestamp and UTC date string. It uses [dayjs](https://day.js.org/en) for the conversion.

NB: This project builds on boilerplate code provided for the [Timestamp Microservice project](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice).

## API Endpoint

`/api/:date?:` Returns a JSON object with `unix` and `utc` keys, representing the input date in milliseconds and UTC format, respectively.
If no date parameter is provided, the API returns the current time in JSON format.

## Example Use Cases

`/api/1451001600000` returns
```
{ 
    "unix": 1451001600000,
    "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
``` 

`/api` returns the current time in JSON format, e.g.

```
{
  "unix": 1742060893249,
  "utc": "Sat, 15 Mar 2025 17:48:13 GMT"
}
```
