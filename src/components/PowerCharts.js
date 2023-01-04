import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import moment from 'moment-timezone';
const tzone = "Asia/Amman";

export const ChartComponent = props => {
  const {
    data,
    colors: {
      backgroundColor = 'white',
      lineColor = '#2962FF',
      textColor = 'black',
      fontSize = 14,
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    },
  } = props;
  const chartContainerRef = useRef();

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const chart = createChart(chartContainerRef.current, {
        layout: {
          // background: { type: ColorType.Solid, color: backgroundColor },
          // textColor,
          fontSize
        },
        width: 900,
        height: 300,
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
          //minBarSpacing: 2,
          // rightBarStaysOnScroll: true,
          //borderColor: "#2B2B43"
        }
      });

      chart.timeScale().fitContent();
      // if (data.length == 1 && data[0].value == 0) {
      //   chart.timeScale().fitContent();
      // } else {
      //   let randomValue = Math.floor(Math.random() * (10 - 2 + 1) + 2)
      //   chart.timeScale().scrollToPosition(-randomValue, false);
      // }


      const newSeries = chart.addBaselineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
      newSeries.setData(data);


      const container = document.getElementsByClassName('tv-lightweight-charts');

      function dateToString(date) {
        var dateFormat = new Date(date);
        var dateString = moment.unix(date).tz(tzone).format("D MMM YYYY");
        //console.log("dateFormat", dateString)
        return dateString
        return `${date.year} - ${date.month} - ${date.day}`;
      }

      const toolTipWidth = 80;
      const toolTipHeight = 80;
      const toolTipMargin = 15;

      // Create and style the tooltip html element
      const toolTip = document.createElement('div');
      toolTip.style = `height: auto; position: absolute; display: none; padding: 4px; box-sizing: border-box; font-size: 13px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
      toolTip.style.background = 'darkcyan';
      toolTip.style.color = 'white';
      toolTip.style.borderColor = 'rgba( 38, 166, 154, 1)';
      //console.log("container", container)
      container[0].appendChild(toolTip);

      // update tooltip
      chart.subscribeCrosshairMove(param => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > container.clientWidth ||
          param.point.y < 0 ||
          param.point.y > container.clientHeight
        ) {
          toolTip.style.display = 'none';
        } else {

          const dateStr = dateToString(param.time);
          //console.log("date time", param.time)
          toolTip.style.display = 'block';
          const price = param.seriesPrices.get(newSeries);
          toolTip.innerHTML = `<div style="color: ${'rgb(255, 255, 255)'}">Total Power</div><div style="font-size: 24px; margin: 0px 0px; color: ${'white'}">
			${Math.round(100 * price) / 100}
			</div><div style="">
			</div>`;

          const y = param.point.y;
          let left = param.point.x + toolTipMargin;
          if (left > container.clientWidth - toolTipWidth) {
            left = param.point.x - toolTipMargin - toolTipWidth;
          }

          let top = y + toolTipMargin;
          if (top > container.clientHeight - toolTipHeight) {
            top = y - toolTipHeight - toolTipMargin;
          }
          toolTip.style.left = left + 'px';
          toolTip.style.top = top + 'px';
        }
      });

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, lineColor, textColor, fontSize, areaTopColor, areaBottomColor]
  );

  return (
    <div
      ref={chartContainerRef}
    />
  );
};

// const initialData = [ 
//   { time: '2018-12-22', value: 32.51 },
// ];

function App(props) {
  //console.log("app props data", props)
  const { powerDataFromDB } = props
  let myData;
  if (typeof (powerDataFromDB) != "undefined") {
    myData = Object.keys(powerDataFromDB).map(key => {
      return powerDataFromDB[key];
    })
  } else {
    myData = []
  }

  //console.log("final data", myData)
  return (
    <ChartComponent
      {...props}
      data={myData}
      colors={{
        backgroundColor: 'white',
        lineColor: '#2962FF',
        textColor: 'black',
        fontSize: 14,
        areaTopColor: '#2962FF',
        areaBottomColor: 'rgba(41, 98, 255, 0.28)',
      }}
    ></ChartComponent>
  );
}

export default App

