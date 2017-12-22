import * as actions from "./actions";
import moment from "moment-timezone";

const originalTime = moment("2017-12-18 10:30:01");
const formattedTime = moment(originalTime).format("YYYY[-]MM[-]DD");
const endOfWeek = moment(originalTime).endOf("week");
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
    const action = actions.fetchStockRequest(value);
    expect(action.type).toEqual(actions.FETCH_STOCK_REQUEST);
    expect(action.value).toEqual(value);
  });
});

describe("fetchStockFail", () => {
  it("Should return the action", () => {
    const action = actions.fetchStockFail();
    expect(action.type).toEqual(actions.FETCH_STOCK_FAIL);
  });
});

describe("fetchStockSuccess", () => {
  it("Should return the action", () => {
    const stockData = { symbol: "IBM" };
    const action = actions.fetchStockSuccess(stockData);
    expect(action.type).toEqual(actions.FETCH_STOCK_SUCCESS);
    expect(action.stockData).toEqual(stockData);
  });
});

describe("fetchHeadlinesRequest", () => {
  it("Should return the action", () => {
    const action = actions.fetchHeadlinesRequest();
    expect(action.type).toEqual(actions.FETCH_HEADLINES_REQUEST);
  });
});

describe("fetchHeadlinesFail", () => {
  it("Should return the action", () => {
    const action = actions.fetchHeadlinesFail();
    expect(action.type).toEqual(actions.FETCH_HEADLINES_FAIL);
  });
});

describe("fetchHeadlinesSuccess", () => {
  it("Should return the action", () => {
    const headlineData = [{ title: "IBM" }];
    const action = actions.fetchHeadlinesSuccess(headlineData);
    expect(action.type).toEqual(actions.FETCH_HEADLINES_SUCCESS);
    expect(action.headlineData).toEqual(headlineData);
  });
});

describe("fetchStock", () => {  
  it("Should dispatch fetchStockRequest and fetchStockSuccess", () => {
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
    //const stockRequestSpy = jest.spyOn(actions, "fetchStockRequest");
    //const fetchSuccessSpy = jest.spyOn(actions, "fetchStockSuccess");
    return actions.fetchStock("ibm")(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalled();
      //expect(stockRequestSpy).toHaveBeenCalledWith("ibm");
      expect(fetch).toHaveBeenCalledWith("/data/ibm");
      //expect(fetchSuccessSpy).toHaveBeenCalledWith(finalStockData);
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
    return actions.fetchHeadlines("ibm")(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith("/headlines/ibm");
      expect(dispatch).toHaveBeenCalledWith(actions.fetchHeadlinesSuccess(finalHeadlineData));
    });
  });
});