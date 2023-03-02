import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
  const {
    data,
    chartType,
    colors: {
      color = "#186ba1e0",
      backgroundColor = 'white',
      lineColor = '#ffd044',
      textColor = 'black',
      fontSize = 14,
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    },
  } = props;
  const chartContainerRef = useRef();

  useCustomCompareEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };
      let chart
      if (chartType == 'monthly') {
        chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: backgroundColor },
            textColor,
            fontSize
          },
          width: 900,
          height: 350,
          timeScale: {
            // timeVisible: true,
            // secondsVisible: true,
            //fixRightEdge: true,
            //rightOffset: 1,
            rightOffset: 5,
            minBarSpacing: 3,
            tickMarkFormatter: (time) => {
              console.log(time)
              const date = new Date(time.year, time.month, time.day);
              return date.getDate() + '/' + date.getMonth() + '/' + (date.getFullYear());
            },
          }
        });
      } else {
        chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: backgroundColor },
            textColor,
            fontSize
          },
          width: 900,
          height: 350,
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
            rightOffset: 5,
            minBarSpacing: 3
          }
        });
      }

      chart.timeScale().fitContent();

      const newSeries = chart.addHistogramSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
      //const newSeries = chart.addHistogramSeries({ color });
      newSeries.setData(data);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, color, lineColor, textColor, fontSize, areaTopColor, areaBottomColor],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
  );

  return (
    <div
      ref={chartContainerRef}
    />
  );
};

function App(props) {
  //console.log("app props data", props)
  const { energyDataFromDB, chartType } = props
  let myData;
  if (typeof (energyDataFromDB) != "undefined") {
    myData = Object.keys(energyDataFromDB).map(key => {
      return energyDataFromDB[key];
    })
  } else {
    myData = []
  }

  //console.log("final data", myData)
  return (
    <ChartComponent
      {...props}
      data={myData}
      chartType={chartType}
      colors={{
        color: "#186ba1e0",
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