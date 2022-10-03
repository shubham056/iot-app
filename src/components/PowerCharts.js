import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
  const {
    data,
    colors: {
      backgroundColor = 'white',
      lineColor = '#2962FF',
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

      const chart = createChart(chartContainerRef.current, {
        layout: {
          //background: { type: ColorType.Solid, color: backgroundColor },
          //textColor,
        },
        width: 500,
        height: 300,
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
      }
      });
      chart.timeScale().fitContent();

      const newSeries = chart.addLineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
       newSeries.setData(data);

       window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  return (
    <div
      ref={chartContainerRef}
    />
  );
};

const initialData = [
  { time: '2018-12-22', value: 32.51 },
];

function App(props) {
  console.log("app props data", props)
  const { powerDataFromDB } = props
  let myData;
  if(typeof(powerDataFromDB) != "undefined"){
    myData = Object.keys(powerDataFromDB).map(key => {
      return powerDataFromDB[key];
    })
  }else{
    myData = []
  }
 
  console.log("final data", myData)
  return (
    <ChartComponent
      {...props}
      data={myData}
      colors={{
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

