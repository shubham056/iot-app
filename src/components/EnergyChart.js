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
      let chart
      if (chartType == 'monthly') {
         chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: backgroundColor },
            textColor,
          },
          width: 500,
          height: 300,
          timeScale: {
            // timeVisible: true,
            // secondsVisible: true,
            fixRightEdge: true,
            rightOffset: 3,
            tickMarkFormatter: (time) => {
                console.log(time)
                const date = new Date(time.year, time.month, time.day);
                return date.getDate() + '/' + date.getMonth() + '/' + (date.getFullYear());
            },
          }
        });
      }else{
         chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: backgroundColor },
            textColor,
          },
          width: 500,
          height: 300,
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
            fixRightEdge: true,
            rightOffset: 3,
          }
        });
      }
      
      chart.timeScale().fitContent();

      const newSeries = chart.addHistogramSeries({color, lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
      //const newSeries = chart.addHistogramSeries({ color });
      newSeries.setData(data);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, color, lineColor, textColor, areaTopColor, areaBottomColor]
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
  console.log("app props data", props)
  const { energyDataFromDB, chartType } = props
  let myData;
  if (typeof (energyDataFromDB) != "undefined") {
    myData = Object.keys(energyDataFromDB).map(key => {
      return energyDataFromDB[key];
    })
  } else {
    myData = []
  }

  console.log("final data", myData)
  return (
    <ChartComponent
      {...props}
      data={myData}
      chartType = {chartType}
      colors={{
        color: "#186ba1e0",
        backgroundColor: 'white',
        lineColor: '#2962FF',
        textColor: 'black',
        areaTopColor: '#2962FF',
        areaBottomColor: 'rgba(41, 98, 255, 0.28)',
      }}
    ></ChartComponent>
  );
}

export default App

