import {API_BASE_URL} from '../config';
import {parseXml, xml2json} from './converter';

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
  fetch(`${API_BASE_URL}/data`, { body: { symbol: stockSymbol } })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(stockData => {
      const currentTime = moment().format('YYYY[-]MM[-]DD');
      const startOfWeek = moment().startOf('week').format('YYYY[-]MM[-]DD');
      const endOfWeek = moment().endOf("week");
      const prevWeek = endOfWeek.subtract(7, 'days');
      const previousWeek = prevWeek.format('YYYY[-]MM[-]DD');
      const prevMonth = prevWeek.subtract(4, 'weeks').format('YYYY[-]MM[-]DD');
      const prev3Month = prevWeek.subtract(12, 'weeks').format('YYYY[-]MM[-]DD');
      const prevYear = prevWeek.subtract(52, 'weeks').format('YYYY[-]MM[-]DD');

      const currentVal = parseFloat(stockData['Weekly Time Series'][currentTime]['4. close']);
      const startingVal = parseFloat(stockData['Weekly Time Series'][currentTime]['1. open']);
      const weekStartVal = parseFloat(stockData['Weekly Time Series'][previousWeek]['4. close']);
      const oneMonthVal = parseFloat(stockData['Weekly Time Series'][prevMonth]['4. close']);
      const threeMonthVal = parseFloat(stockData['Weekly Time Series'][prev3Month]['4. close']);
      const yearVal = parseFloat(stockData['Weekly Time Series'][prevYear]['4. close']);

      const finalStockData = {
        currentTimeOfQuote: moment.format('MMM D, HH:mm A z');
        currentValue: Math.round(currentVal * 1e2) / 1e2,
        startingValue: Math.round(startingVal * 1e2) / 1e2,
        change: Math.round((currentVal - startingVal) * 1e2) / 1e2,
        weekStartingValue: Math.round(weekStartVal * 1e2) / 1e2,
        oneMonthValue: Math.round(oneMonthVal * 1e2) / 1e2,
        threeMonthValue: Math.round(threeMonthVal * 1e2) / 1e2,
        yearValue: Math.round(yearVal * 1e2) / 1e2
      };
      
      dispatch(fetchStockSuccess(finalStockData));
    });
};

export const fetchHeadlines = (stockSymbol) => dispatch => {
  fetch(`${API_BASE_URL}/headlines`, { body: { symbol: stockSymbol } })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.text();
    })
    .then(headlineData => {
      const parsedXml = parseXml(headlineData);
      const convertedJson = xml2json(parsedXml, tab);
      let finalHeadlineData = convertedJson.rss.item.slice(0, 5).map(story => ({
        title: story.title,
        link: story.link,
        description: story.description
      }));
      dispatch(fetchHeadlinesSuccess(finalHeadlineData))
    }); 
}