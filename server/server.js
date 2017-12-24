const express = require("express");
const request = require("request");
const path = require("path");
const app = express();

const staticFiles = express.static(path.join(__dirname, "../../client/build"));
app.use(staticFiles);

app.get("/data/:query", (req, res) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${req.params.query}&apikey=S3H1N4O2750Y09RN`;
  request.get({ url: url, headers: {"content-type": "application/json"} }).pipe(res);
});

app.get("/headlines/:query", (req, res) => {
  let url = `https://finance.yahoo.com/rss/headline?s=${req.params.query}&region=US&lang=en-US`;
  request.get({ url: url, headers: {"content-type": "text/xml"} }).pipe(res);
});

app.use("*", function (req, res) {
  return res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });