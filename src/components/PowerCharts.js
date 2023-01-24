import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";
import UserService from "../services/user.service";
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment-timezone';
const tzone = "Asia/Amman";



const ChartComponent = props => {
  const elRef = useRef();
  const chartRef = useRef()
  const candlestickSeriesRef = useRef()
  const [initCandles, setInitCandles] = useState([])
  const [lastCandle, setLastCandle] = useState({})
  const [isLoadingGraph, setisLoadingGraph] = useState(false)

  const {
    isFilterGraphData,
    graphDataFromFilter,
    isGraphDataFromSocket,
    graphDataFromSocket,
    device_id,
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

  useEffect(() => {
    // get initial data from API
    if (device_id) {
      //console.log("!!!!!call power initial use effect!!!!!!!!!!")
      setisLoadingGraph(true)
      UserService.GetLinkedDeviceData(device_id, "T_power_A")
        .then((res) => {
          //console.log("power initial res:", res.data.data.deviceData)
          let powerDataFromDB = res.data.data.deviceData
          let myData
          if (typeof (powerDataFromDB) != "undefined") {
            myData = Object.keys(powerDataFromDB).map(key => {
              return powerDataFromDB[key];
            })
          } else {
            myData = []
          }
          setInitCandles(myData)
          setisLoadingGraph(false)
        }).catch(err => {
          setisLoadingGraph(false)
          console.log(err)
        })
    }
  }, [device_id])


  useEffect(
    () => {


      const handleResize = () => {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          // background: { type: ColorType.Solid, color: backgroundColor },
          // textColor,
          fontSize
        },
        width: 900,
        height: 350,
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
          minBarSpacing: -1,
          // rightBarStaysOnScroll: true,
          //borderColor: "#2B2B43"
        }
      });

      candlestickSeriesRef.current = chartRef.current.addBaselineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
      candlestickSeriesRef.current.setData(initCandles);
      chartRef.current.timeScale().fitContent()

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
      chartRef.current.subscribeCrosshairMove(param => {
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
          const price = param.seriesPrices.get(candlestickSeriesRef.current);
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

        chartRef.current.remove();
      };
    }, [initCandles]);

  useCustomCompareEffect(
    () => {
      console.log("is filter data:", isFilterGraphData, "is socket data:", isGraphDataFromSocket)
      //Filter data
      if (isFilterGraphData) {
        console.log("filter data:", graphDataFromFilter)
        let myData;
        if (typeof (graphDataFromFilter) != "undefined") {
          myData = Object.keys(graphDataFromFilter).map(key => {
            return graphDataFromFilter[key];
          })
        } else {
          myData = []
        }
        candlestickSeriesRef.current.setData(myData)
      }
      //Socket data
      if (isGraphDataFromSocket) {
        console.log("Graph data from socket:", graphDataFromSocket)
        if (graphDataFromSocket.length > 0) {
          candlestickSeriesRef.current.setData(graphDataFromSocket)
        }
        


        // console.log("Graph data from socket data len:", graphDataFromSocket)
        // //check for empty object
        // if (Object.keys(graphDataFromSocket).length != 0) {
        //   console.log("in update", graphDataFromSocket[0])
        //   candlestickSeriesRef.current.setData(graphDataFromSocket)
        //   //candlestickSeriesRef.current.update(graphDataFromSocket[0])

        //   //check for len 1 object
        //   // if (Object.keys(graphDataFromSocket).length === 1) {
        //   //   console.log("in update", graphDataFromSocket[0])
        //   //   candlestickSeriesRef.current.update(graphDataFromSocket[0])
        //   // } else {

        //   //   let myData;
        //   //   if (typeof (graphDataFromFilter) != "undefined") {
        //   //     myData = Object.keys(graphDataFromFilter).map(key => {
        //   //       return graphDataFromFilter[key];
        //   //     })
        //   //   } else {
        //   //     myData = []
        //   //   }
        //   //   console.log("in set data", myData)
        //   //   candlestickSeriesRef.current.setData(myData)
        //   // }
        //}

      }
    },
    [isFilterGraphData, graphDataFromFilter, isGraphDataFromSocket, graphDataFromSocket, backgroundColor, lineColor, textColor, fontSize, areaTopColor, areaBottomColor],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
  );


  return (
    <>
      {
        isLoadingGraph
          ?
          <p style={{ textAlign: 'center', padding: 108 }}>Loading...</p>
          :
          <div ref={chartContainerRef} />
      }
    </>

  );
};

const MemoizedSubComponent = React.memo(ChartComponent);

// const initialData = [ 
//   { time: '2018-12-22', value: 32.51 },
// ];

function App(props) {
  const { isGraphDataFromSocket, graphDataFromSocket, isFilterGraphData, graphDataFromFilter, device_id } = props
  return (
    <MemoizedSubComponent
      {...props}
      isFilterGraphData={isFilterGraphData}
      graphDataFromFilter={graphDataFromFilter}
      isGraphDataFromSocket={isGraphDataFromSocket}
      graphDataFromSocket={graphDataFromSocket}
      device_id={device_id}
      colors={{
        backgroundColor: 'white',
        lineColor: '#2962FF',
        textColor: 'black',
        fontSize: 14,
        areaTopColor: '#2962FF',
        areaBottomColor: 'rgba(41, 98, 255, 0.28)',
      }}
    ></MemoizedSubComponent>
  );
}

export default App;

