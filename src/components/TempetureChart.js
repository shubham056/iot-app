import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

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
        width: 1200,
        height: 300,
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
          minBarSpacing: 16,
          // rightBarStaysOnScroll: true,
          //borderColor: "#2B2B43"
        }
      });
      chart.timeScale().fitContent();
    //   console.log("dddddddddddddddddddd", data)
    //   if (data.length == 1 && data[0].value == 0) {
    //     console.log("no0000000000000000000000000000000")
    //     chart.timeScale().fitContent();
    //   } else {
    //     console.log('yyyyyyyyyyyyyyyyyyyyyyyy')
    //     let randomValue = Math.floor(Math.random() * (10 - 2 + 1) + 2)
    //     chart.timeScale().scrollToPosition(-randomValue, false);
    //   }


      const newSeries = chart.addBaselineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
      newSeries.setData(data);

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
  const { tempetureDataFromDB } = props
  let myData;
  if (typeof (tempetureDataFromDB) != "undefined") {
    myData = Object.keys(tempetureDataFromDB).map(key => {
      return tempetureDataFromDB[key];
    })
  } else {
    myData = []
  }

  console.log("final tempeture  data", myData)
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

