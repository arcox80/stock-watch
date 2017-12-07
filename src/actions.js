import {parseXml, xml2json} from "./converter";
import moment from "moment";
window.DOMParser = require("xmldom").DOMParser;

export const TOGGLE_INFO_MODAL = "TOGGLE_INFO_MODAL";
export const toggleInfoModal = () => ({
  type: TOGGLE_INFO_MODAL
});

export const FETCH_STOCK_REQUEST = "FETCH_STOCK_REQUEST";
export const fetchStockRequest = value => ({
  type: FETCH_STOCK_REQUEST,
  value
});

export const FETCH_STOCK_SUCCESS = "FETCH_STOCK_SUCCESS";
export const fetchStockSuccess = stockData => ({
  type: FETCH_STOCK_SUCCESS,
  stockData
});

export const FETCH_STOCK_FAIL = "FETCH_STOCK_FAIL";
export const fetchStockFail = () => ({
  type: FETCH_STOCK_FAIL
});

export const fetchStock = (stockSymbol) => dispatch => {
  return fetch(`/data/${stockSymbol}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }

      return res.json();
    })
    .then(stockData => {
      if (stockData["Error Message"]) {
        dispatch(fetchStockFail());
      }
      const now = moment();
      let currentTime;
      if (moment().day() === 7) {
        currentTime = now.subtract(1, "days").format("YYYY[-]MM[-]DD");
      } else if (moment().day() === 0) {
        currentTime = now.subtract(2, "days").format("YYYY[-]MM[-]DD");
      } else {
        currentTime = now.format("YYYY[-]MM[-]DD");
      }
      const endOfWeek = moment().endOf("week");
      const prevWeek = endOfWeek.subtract(8, "days");
      const previousWeek = prevWeek.format("YYYY[-]MM[-]DD");
      const prevMonth = prevWeek.subtract(4, "weeks").format("YYYY[-]MM[-]DD");
      const prev3Month = prevWeek.subtract(12, "weeks").format("YYYY[-]MM[-]DD");
      const prevYear = prevWeek.subtract(52, "weeks").format("YYYY[-]MM[-]DD");
      const currentVal = parseFloat(stockData["Weekly Time Series"][currentTime]["4. close"]);
      const startingVal = parseFloat(stockData["Weekly Time Series"][currentTime]["1. open"]);
      const changeVal = currentVal - startingVal;
      const weekStartVal = parseFloat(stockData["Weekly Time Series"][previousWeek]["4. close"]);
      const oneMonthVal = parseFloat(stockData["Weekly Time Series"][prevMonth]["4. close"]);
      const threeMonthVal = parseFloat(stockData["Weekly Time Series"][prev3Month]["4. close"]);
      const yearVal = parseFloat(stockData["Weekly Time Series"][prevYear]["4. close"]);

      const finalStockData = {
        currentTimeOfQuote: moment().format("MMM D, h:mm A z"),
        currentValue: currentVal.toFixed(2),
        startingValue: startingVal.toFixed(2),
        change: changeVal.toFixed(2),
        weekStartingValue: weekStartVal.toFixed(2),
        oneMonthValue: oneMonthVal.toFixed(2),
        threeMonthValue: threeMonthVal.toFixed(2),
        yearValue: yearVal.toFixed(2)
      };

      dispatch(fetchStockSuccess(finalStockData));
    })
    .catch(() => { 
      dispatch(fetchStockFail()); 
    });
};



export const FETCH_HEADLINES_REQUEST = "FETCH_HEADLINES_REQUEST";
export const fetchHeadlinesRequest = () => ({
  type: FETCH_HEADLINES_REQUEST,
});

export const FETCH_HEADLINES_SUCCESS = "FETCH_HEADLINES_SUCCESS";
export const fetchHeadlinesSuccess = headlineData => ({
  type: FETCH_HEADLINES_SUCCESS,
  headlineData
});

export const FETCH_HEADLINES_FAIL = "FETCH_HEADLINES_FAIL";
export const fetchHeadlinesFail = () => ({
  type: FETCH_HEADLINES_FAIL
});

export const fetchHeadlines = (stockSymbol) => dispatch => {
  return fetch(`/headlines/${stockSymbol}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.text();
    })
    .then(headlineData => {
      const parsedXml = parseXml(headlineData);
      const convertedJson = xml2json(parsedXml);
      const finalJson = JSON.parse(convertedJson.replace("undefined", ""));
      if (!finalJson.rss.channel.item) {
        dispatch(fetchHeadlinesFail());
      }
      let finalHeadlineData = finalJson.rss.channel.item.slice(0, 5).map(story => ({
        title: story.title,
        link: story.link,
        description: story.description
      }));
      dispatch(fetchHeadlinesSuccess(finalHeadlineData));
    })
    .catch(() => { 
      dispatch(fetchHeadlinesFail()); 
    }); 
};