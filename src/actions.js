import {parseXml, xml2json} from './converter';
import moment from 'moment';
window.DOMParser = require('xmldom').DOMParser;

export const TOGGLE_INFO_MODAL = 'TOGGLE_INFO_MODAL';
export const toggleInfoModal = () => ({
  type: TOGGLE_INFO_MODAL
});

export const FETCH_STOCK_REQUEST = 'FETCH_STOCK_REQUEST';
export const fetchStockRequest = () => ({
  type: FETCH_STOCK_REQUEST
});

export const FETCH_STOCK_SUCCESS = 'FETCH_STOCK_SUCCESS';
export const fetchStockSuccess = stockData => ({
    type: FETCH_STOCK_SUCCESS,
    stockData
});

export const fetchStock = (stockSymbol) => dispatch => {
  fetch(`/data/${stockSymbol}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(stockData => {
      console.log(stockData);
      const currentTime = moment().format('YYYY[-]MM[-]DD');
      const endOfWeek = moment().endOf("week");
      const prevWeek = endOfWeek.subtract(8, 'days');
      const previousWeek = prevWeek.format('YYYY[-]MM[-]DD');
      const prevMonth = prevWeek.subtract(4, 'weeks').format('YYYY[-]MM[-]DD');
      const prev3Month = prevWeek.subtract(12, 'weeks').format('YYYY[-]MM[-]DD');
      const prevYear = prevWeek.subtract(52, 'weeks').format('YYYY[-]MM[-]DD');

      const currentVal = parseFloat(stockData['Weekly Time Series'][currentTime]['4. close']);
      const startingVal = parseFloat(stockData['Weekly Time Series'][currentTime]['1. open']);
      const changeVal = currentVal - startingVal;
      const weekStartVal = parseFloat(stockData['Weekly Time Series'][previousWeek]['4. close']);
      const oneMonthVal = parseFloat(stockData['Weekly Time Series'][prevMonth]['4. close']);
      const threeMonthVal = parseFloat(stockData['Weekly Time Series'][prev3Month]['4. close']);
      const yearVal = parseFloat(stockData['Weekly Time Series'][prevYear]['4. close']);

      const finalStockData = {
        symbol: stockData['Meta Data']['2. Symbol'].toUpperCase(),
        currentTimeOfQuote: moment().format('MMM D, h:mm A z'),
        currentValue: currentVal.toFixed(2),
        startingValue: startingVal.toFixed(2),
        change: changeVal.toFixed(2),
        weekStartingValue: weekStartVal.toFixed(2),
        oneMonthValue: oneMonthVal.toFixed(2),
        threeMonthValue: threeMonthVal.toFixed(2),
        yearValue: yearVal.toFixed(2)
      };

      dispatch(fetchStockSuccess(finalStockData));
    });
};



export const FETCH_HEADLINES_REQUEST = 'FETCH_HEADLINES_REQUEST';
export const fetchHeadlinesRequest = () => ({
    type: FETCH_HEADLINES_REQUEST,
});

export const FETCH_HEADLINES_SUCCESS = 'FETCH_HEADLINES_SUCCESS';
export const fetchHeadlinesSuccess = headlineData => ({
    type: FETCH_HEADLINES_SUCCESS,
    headlineData
});

export const fetchHeadlines = (stockSymbol) => dispatch => {
  fetch(`/headlines`, { body: { symbol: stockSymbol } })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.text();
    })
    .then(headlineData => {
      const parsedXml = parseXml(headlineData);
      const convertedJson = xml2json(parsedXml);
      let finalHeadlineData = convertedJson.rss.item.slice(0, 5).map(story => ({
        title: story.title,
        link: story.link,
        description: story.description
      }));
      dispatch(fetchHeadlinesSuccess(finalHeadlineData));
    }); 
};