import {parseXml, xml2json} from "./converter";
import moment from "moment-timezone";
window.DOMParser = require("xmldom").DOMParser;

export const TOGGLE_INFO_MODAL = "TOGGLE_INFO_MODAL";
export const toggleInfoModal = () => ({
  type: TOGGLE_INFO_MODAL
});

//Actions Related to the Alpha Vantage API
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
  dispatch(fetchStockRequest(stockSymbol));
  return fetch(`/data/${stockSymbol}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(stockData => {
      if (stockData["Error Message"]) {
        const data = {
          error: [
            "I'm sorry, but we were unable to retrieve your quote. Please make sure you entered a valid ticker symbol.",
            "If you did enter a valid ticker symbol, then the Alpha Vantage API is down right now. Please try again later."
          ]
        };
        return dispatch(fetchStockSuccess(data));
      }
      const before = moment("00:00:00", "HH:mm:ss");
      const after = moment("09:30:00", "HH:mm:ss");
      const originalTime = moment().tz("America/New_York");
      let formattedTime;
      //set time to previous day when stock market hasn't opened yet
      if (originalTime.isBetween(before, after, [])) {
        formattedTime = moment(originalTime).subtract(1, "days");
        formattedTime.hour(23);
      }
      if (originalTime.day() === 6) {
        formattedTime = moment(originalTime).subtract(1, "days").format("YYYY[-]MM[-]DD");
      } else if (originalTime.day() === 0) {
        formattedTime = moment(originalTime).subtract(2, "days").format("YYYY[-]MM[-]DD");
      } else {
        formattedTime = moment(originalTime).format("YYYY[-]MM[-]DD");
      }

      const endOfWeek = moment(originalTime).endOf("week");
      const prevWeek = endOfWeek.subtract(8, "days");
      const previousWeek = prevWeek.format("YYYY[-]MM[-]DD");
      const prevMonth = prevWeek.subtract(4, "weeks").format("YYYY[-]MM[-]DD");
      const prev3Month = moment(prevWeek).subtract(12, "weeks").format("YYYY[-]MM[-]DD");
      const prevYear = moment(prevWeek).subtract(52, "weeks").format("YYYY[-]MM[-]DD");
      console.log(originalTime);
      console.log(formattedTime);
      const currentVal = parseFloat(stockData["Weekly Time Series"][formattedTime]["4. close"]);
      const startingVal = parseFloat(stockData["Weekly Time Series"][formattedTime]["1. open"]);
      const changeVal = currentVal - startingVal;
      const weekStartVal = parseFloat(stockData["Weekly Time Series"][previousWeek]["4. close"]);
      const oneMonthVal = parseFloat(stockData["Weekly Time Series"][prevMonth]["4. close"]);
      const threeMonthVal = parseFloat(stockData["Weekly Time Series"][prev3Month]["4. close"]);
      const yearVal = parseFloat(stockData["Weekly Time Series"][prevYear]["4. close"]);

      const finalStockData = {
        currentTimeOfQuote: originalTime.format("MMM D, h:mm A z"),
        currentValue: currentVal.toFixed(2),
        startingValue: startingVal.toFixed(2),
        change: changeVal.toFixed(2),
        weekStartingValue: weekStartVal.toFixed(2),
        oneMonthValue: oneMonthVal.toFixed(2),
        threeMonthValue: threeMonthVal.toFixed(2),
        yearValue: yearVal.toFixed(2)
      };

      return dispatch(fetchStockSuccess(finalStockData));
    })
    .catch(error => {
      console.log(error);
      dispatch(fetchStockFail());
    });
};

//Actions Related to the Yahoo Finance API
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
  dispatch(fetchHeadlinesRequest());
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