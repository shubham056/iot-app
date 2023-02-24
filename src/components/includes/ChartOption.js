const dataURL = "https://demo-live-data.highcharts.com/aapl-historical.json";

const chartOptions = {
  navigator: {
    adaptToUpdatedData: false
  },

  scrollbar: {
    liveRedraw: false
  },

  title: {
    text: "AAPL history by the minute from 1998 to 2011"
  },

  subtitle: {
    text:
      "Displaying 1.7 million data points in Highcharts Stock by async server loading"
  },

  rangeSelector: {
    buttons: [
      {
        type: "hour",
        count: 1,
        text: "1h"
      },
      {
        type: "day",
        count: 1,
        text: "1d"
      },
      {
        type: "month",
        count: 1,
        text: "1m"
      },
      {
        type: "year",
        count: 1,
        text: "1y"
      },
      {
        type: "all",
        text: "All"
      }
    ],
    inputEnabled: false, // it supports only days
    selected: 4 // all
  },

  yAxis: {
    floor: 0
  },

  series: [
    {
      dataGrouping: {
        enabled: false
      }
    }
  ]
};

export { chartOptions, dataURL };
