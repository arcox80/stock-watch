"use strict";

var express = require("express");
var request = require("request");
var path = require("path");
var app = express();

var staticFiles = express.static(path.join(__dirname, "../../client/build"));
app.use(staticFiles);

app.get("/data/:query", function (req, res) {
  var url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=" + req.params.query + "&apikey=S3H1N4O2750Y09RN";
  request.get({ url: url, headers: { "content-type": "application/json" } }).pipe(res);
});

app.get("/headlines/:query", function (req, res) {
  var url = "https://finance.yahoo.com/rss/headline?s=" + req.params.query + "&region=US&lang=en-US";
  request.get({ url: url, headers: { "content-type": "text/xml" } }).pipe(res);
});

app.use("*", function (req, res) {
  return res.status(404).json({ message: "Not Found" });
});

var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});