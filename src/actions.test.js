import {
  FETCH_STOCK_REQUEST, fetchStockRequest, 
  FETCH_STOCK_SUCCESS, fetchStockSuccess,
  FETCH_STOCK_FAIL, fetchStockFail,
  FETCH_HEADLINES_REQUEST, fetchHeadlinesRequest,
  FETCH_HEADLINES_SUCCESS, fetchHeadlinesSuccess,
  FETCH_HEADLINES_FAIL, fetchHeadlinesFail,
  fetchStock, fetchHeadlines
} from "./actions";
import moment from "moment-timezone";

const originalTime = moment().tz("America/New_York");
const formattedTime = originalTime.format("YYYY[-]MM[-]DD");
const endOfWeek = originalTime.endOf("week");
const prevWeek = endOfWeek.subtract(8, "days");
const previousWeek = prevWeek.format("YYYY[-]MM[-]DD");
const prevMonth = prevWeek.subtract(4, "weeks").format("YYYY[-]MM[-]DD");
const prev3Month = prevWeek.subtract(12, "weeks").format("YYYY[-]MM[-]DD");
const prevYear = prevWeek.subtract(52, "weeks").format("YYYY[-]MM[-]DD");
const stockData = {
  "Weekly Time Series": {
    [formattedTime]: {
      "1. open": "83.3100",
      "4. close": "83.8850"
    },
    [previousWeek]: {
      "4. close": "82.2600"
    },
    [prevMonth]: {
      "4. close": "80.4560"
    },
    [prev3Month]: {
      "4. close": "78.8930"
    },
    [prevYear]: {
      "4. close": "68.2130"
    },
  }
};

const headlineData = `
  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <rss version="2.0">
      <channel>
          <item>
              <description>They drove the world wide web's evolution.</description>
              <link>https://finance.yahoo.com/news</link>
              <title>The 15 Most Influential Websites of All Time</title>
          </item>
          <item>
              <description>Article Description</description>
              <link>https://finance.yahoo.com/news</link>
              <title>Article Title</title>
          </item>
      </channel>
  </rss>
`;

describe("fetchStockRequest", () => {
  it("Should return the action", () => {
    const value = "ibm";
    const action = fetchStockRequest(value);
    expect(action.type).toEqual(FETCH_STOCK_REQUEST);
    expect(action.value).toEqual(value);
  });
});

describe("fetchStockFail", () => {
  it("Should return the action", () => {
    const action = fetchStockFail();
    expect(action.type).toEqual(FETCH_STOCK_FAIL);
  });
});

describe("fetchStockSuccess", () => {
  it("Should return the action", () => {
    const stockData = { symbol: "IBM" };
    const action = fetchStockSuccess(stockData);
    expect(action.type).toEqual(FETCH_STOCK_SUCCESS);
    expect(action.stockData).toEqual(stockData);
  });
});

describe("fetchHeadlinesRequest", () => {
  it("Should return the action", () => {
    const action = fetchHeadlinesRequest();
    expect(action.type).toEqual(FETCH_HEADLINES_REQUEST);
  });
});

describe("fetchHeadlinesFail", () => {
  it("Should return the action", () => {
    const action = fetchHeadlinesFail();
    expect(action.type).toEqual(FETCH_HEADLINES_FAIL);
  });
});

describe("fetchHeadlinesSuccess", () => {
  it("Should return the action", () => {
    const headlineData = [{ title: "IBM" }];
    const action = fetchHeadlinesSuccess(headlineData);
    expect(action.type).toEqual(FETCH_HEADLINES_SUCCESS);
    expect(action.headlineData).toEqual(headlineData);
  });
});

describe("fetchStock", () => {
  it("Should dispatch fetchStockSuccess", () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return stockData;
        }
      })
    );

    const finalStockData = {
      currentTimeOfQuote: originalTime.format("MMM D, h:mm A z"),
      currentValue: parseFloat(stockData["Weekly Time Series"][formattedTime]["4. close"]).toFixed(2),
      startingValue: parseFloat(stockData["Weekly Time Series"][formattedTime]["1. open"]).toFixed(2),
      weekStartingValue: parseFloat(stockData["Weekly Time Series"][previousWeek]["4. close"]).toFixed(2),
      oneMonthValue: parseFloat(stockData["Weekly Time Series"][prevMonth]["4. close"]).toFixed(2),
      threeMonthValue: parseFloat(stockData["Weekly Time Series"][prev3Month]["4. close"]).toFixed(2),
      yearValue: parseFloat(stockData["Weekly Time Series"][prevYear]["4. close"]).toFixed(2)
    };
    finalStockData.change = (finalStockData.currentValue - finalStockData.startingValue).toFixed(2);

    const dispatch = jest.fn();
    return fetchStock("ibm")(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith("/data/ibm");
      expect(dispatch).toHaveBeenCalledWith(fetchStockSuccess(finalStockData));
    });
  });
});

describe("fetchHeadlines", () => {
  it("Should dispatch fetchHeadlinesSuccess", () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text() {
          return headlineData;
        }
      })
    );

    const finalHeadlineData = [
      {
        "description": "They drove the world wide web's evolution.",
        "link": "https://finance.yahoo.com/news",
        "title": "The 15 Most Influential Websites of All Time"
      },
      {
        "description": "Article Description",
        "link": "https://finance.yahoo.com/news",
        "title": "Article Title"
      }
    ];

    const dispatch = jest.fn();
    return fetchHeadlines("ibm")(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith("/headlines/ibm");
      expect(dispatch).toHaveBeenCalledWith(fetchHeadlinesSuccess(finalHeadlineData));
    });
  });
});