const express = require('express');
const request = require('request');
const http = require('http');
const {API_KEY} = require('./config');

const app = express();
app.use(express.static('./'))

app.post('/data', (req, res) => {
  let url = `https://finance.yahoo.com/rss/headline?s=${req.body.symbol}&region=US&lang=en-US`;
  request.get({ url: url, headers: {'content-type': 'text/xml'} }).pipe(res);
});

app.post('/headlines', (req, res) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${req.body.symbol}&apikey=${API_KEY}`;
  request.get({ url: url, headers: {'content-type': 'application/json'} }).pipe(res);
});

app.use('*', function (req, res) {
  return res.status(404).json({ message: 'Not Found' });
});

app.listen(process.env.PORT || 8080, () => { console.log('Listening on port 8080')});