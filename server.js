const express = require('express');
const request = require('request');
const http = require('http');
const {API_KEY, PORT} = require('./config');

const app = express();
app.use(express.static('./'))

app.get('/headlines', (req, res) => {
  let url = `https://finance.yahoo.com/rss/headline?s=${req.body.symbol}&region=US&lang=en-US`;
  request.get({ url: url, headers: {'content-type': 'text/xml'} }).pipe(res);
});

app.get('/data/:query', (req, res) => {
  console.log(req.params.query);
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${req.params.query}&apikey=${API_KEY}`;
  console.log(url);
  request.get({ url: url, headers: {'content-type': 'application/json'} }).pipe(res);
});

app.use('*', function (req, res) {
  return res.status(404).json({ message: 'Not Found Hello' });
});

app.listen(PORT, () => { console.log('Listening on port' + PORT)});