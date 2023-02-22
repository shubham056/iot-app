import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";
import UserService from "../services/user.service";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";

import ReactApexChart from "react-apexcharts";
import { ApexOptions, ApexCharts } from "apexcharts";

export default function App(props) {
  const { isGraphDataFromSocket, graphDataFromSocket, isFilterGraphData, graphDataFromFilter, device_id } = props;
  const chartRef = useRef();
  const [gData, setGData] = useState([]);
  const [isLoadingGraph, setisLoadingGraph] = useState(false)


  const [chartConfig] = useState({
    options: {
      chart: {
        id: "total-power-chart",
        type: "line",
        stacked: true,
        height: 350,
        animations: {
          enabled: true,
          easing: 'linear',
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 700
          }
        },
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true,
        min: 0,
        decimalsInFloat: 2,
        axisBorder: {
          show: true,
          color: '#78909C',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#78909C',
          width: 6,
          offsetX: 0,
          offsetY: 0
        },
        title: {
          text: "Total Power",
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: '#b6b6b6',
            width: 0.6,
            dashArray: [0, 1, 2],
          },
        },
        tooltip: {
          enabled: true,
          offsetX: 10,
        },
      },
      tooltip: {
        enabled: true,
        shared: false,
        x: {
          format: 'dd MMM yyyy'
        }
      },
      stroke: {
        width: 2.5,
      },
      colors: ['#1d9b9c'],
      //fill: {
      //type: "solid",
      // gradient: {
      //   shade: "light",
      //   type: "horizontal",
      //   shadeIntensity: 0.5,
      //   gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      //   inverseColors: true,
      //   opacityFrom: 1,
      //   opacityTo: 1,
      //   stops: [0, 50, 100]
      //   // colorStops: []
      // }
      //},
      legend: {
        // position: '',
        //width: 400
        position: 'top',
      }
    }
  });

  useEffect(() => {
    // get initial data from API
    if (device_id) {
      //console.log("!!!!!call power initial use effect!!!!!!!!!!")
      setisLoadingGraph(true)
      UserService.GetLinkedDeviceData(device_id, "T_power_A")
        .then((res) => {
          setisLoadingGraph(false)
        }).catch(err => {
          setisLoadingGraph(false)
          console.log(err)
        })
    }
  }, [device_id])

  useCustomCompareEffect(() => {
    if (isFilterGraphData) {
      console.log("filter data:", graphDataFromFilter)
      let myData;
      if (typeof (graphDataFromFilter) != "undefined") {
        myData = Object.keys(graphDataFromFilter).map(key => {
          return ([
            new Date(graphDataFromFilter[key].time),
            graphDataFromFilter[key].value
          ])
        })
      } else {
        myData = []
      }
      console.log("filter array data: ", myData)
      // console.log("res array data: ", res)
      if (myData.length > 0) {
        setGData(
          [{
            name: "Power",
            data: myData
          }]
        )
      }

      console.log("upp!!!!!!!", gData)
    }
    //Socket data
    if (isGraphDataFromSocket) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!! Graph data from socket:", graphDataFromSocket)
      if (graphDataFromSocket.length > 0) {
        let myData = graphDataFromSocket.map(item => {
          return ([
            new Date(item.time),
            item.value
          ])
        })
        if (chartRef) {
          chartRef.current.chart.ctx.appendData([
            {
              data: myData
            }
          ]);
        }
      }
      console.log("socket g data!!!!!!!", gData)
    }
  },
    [isFilterGraphData, graphDataFromFilter, isGraphDataFromSocket, graphDataFromSocket],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
  )
  return (
    <>
      {
        isLoadingGraph
          ?
          <p style={{ textAlign: 'center', padding: 108 }}>Loading...</p>
          :
          <ReactApexChart ref={chartRef} options={chartConfig.options} series={gData} />
      }
    </>
  )

}


