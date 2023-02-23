import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";
import UserService from "../services/user.service";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";

import ReactApexChart from "react-apexcharts";
import { ApexOptions, ApexCharts } from "apexcharts";

export default function App(props) {
  const chartRef = useRef();
  const [gData, setGData] = useState([]);
  const [initCandles, setInitCandles] = useState([12, 13])
  const [isLoadingGraph, setisLoadingGraph] = useState(false)
  const format = "daterange-initial";

  const { isGraphDataFromSocket, graphDataFromSocket, isFilterGraphData, graphDataFromFilter, device_id } = props;

  //console.log("current month first date");
  const firstdate = moment().startOf('month').unix();
  //console.log("firstdate", firstdate);

  //console.log("current month last date");
  const lastdate = moment().endOf('month').unix();
  //console.log("lastdate", lastdate);

  useEffect(() => {
    // get initial data from API
    if (device_id) {
      //console.log("!!!!!call power initial use effect!!!!!!!!!!")
      setisLoadingGraph(true)
      UserService.GetLinkedDeviceData(device_id, "T_power_A")
        .then((res) => {
          //console.log("power initial res:", res.data.data.deviceData)
          let powerDataFromDB = res.data.data.deviceData
          console.log("res Data!!!!!!!!!", powerDataFromDB)
          let myData
          if (typeof (powerDataFromDB) != "undefined") {
            myData = Object.keys(powerDataFromDB).map(key => {
              return ([
                graphDataFromFilter[key].time,
                graphDataFromFilter[key].value
              ])
              //return powerDataFromDB[key];
            })
          } else {
            myData = []
          }
          if (myData.length > 0) {
            console.log("Graph Data!!!!!", myData)
            setGData(
              [{
                name: "T-Power",
                data: myData
              }]
            )
          }
          setisLoadingGraph(false)
        }).catch(err => {
          setisLoadingGraph(false)
          // console.log(err)
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
            name: "T-Power",
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
            item.time,
            item.value
          ])
        })
        if (chartRef && chartRef.current != null) {
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





  const [chartConfig] = useState({
    options: {
      chart: {
        id: "total-power-chart",
        type: "line",
        // min: firstdate,
        // max: lastdate,
        events: {
          scrolled: function (chartContext, { xaxis }) {
            console.log("xaxis data pan scroll!!", xaxis)
            console.log("xaxis data pan scroll!!", xaxis, moment(xaxis.min).format('YYYY-MM-DD HH:mm:ss'), moment(xaxis.max).format('YYYY-MM-DD HH:mm:ss'))

            if (xaxis.min != undefined && xaxis.max != undefined) {
              let startDate = moment(xaxis.min).format('YYYY-MM-DD HH:mm:ss')
              let endDate = moment(xaxis.max).format('YYYY-MM-DD HH:mm:ss')

              UserService.GetLinkedDeviceData(device_id, "T_power_A", format, startDate, endDate)
                .then((res) => {
                  // setIsGraphDataFromSocket(false)
                  let myData
                  console.log("filter data from min and max date!!!!!!!!!!!!:", res.data.data.deviceData)
                  let filterData = res.data.data.deviceData
                  if (typeof (filterData) != "undefined") {
                    myData = Object.keys(filterData).map(key => {
                      return ([
                        filterData[key].time,
                        filterData[key].value
                      ])
                    })
                  } else {
                    myData = []
                  }
                  console.log("filter array data!!!!!!!!!!!: ", myData)
                  // console.log("res array data: ", res)
                  if (myData.length > 0) {
                    setGData(
                      [{
                        name: "T-Power",
                        data: myData
                      }]
                    )
                  }

                }).catch(err => {
                  //setIsFilterGraphData(false)
                  console.log(err)
                })
            }
          },
          zoomed: function (chartContext, { xaxis, yaxis }) {
            //console.log("chartContext data!!", chartContext)
            console.log("xaxis data!!", xaxis, moment(xaxis.min).format('YYYY-MM-DD HH:mm:ss'), moment(xaxis.max).format('YYYY-MM-DD HH:mm:ss'))
            if (xaxis.min != undefined && xaxis.max != undefined) {
              let startDate = moment(xaxis.min).format('YYYY-MM-DD HH:mm:ss')
              let endDate = moment(xaxis.max).format('YYYY-MM-DD HH:mm:ss')

              UserService.GetLinkedDeviceData(device_id, "T_power_A", format, startDate, endDate)
                .then((res) => {
                  // setIsGraphDataFromSocket(false)
                  let myData
                  console.log("filter data from min and max date!!!!!!!!!!!!:", res.data.data.deviceData)
                  let filterData = res.data.data.deviceData
                  if (typeof (filterData) != "undefined") {
                    myData = Object.keys(filterData).map(key => {
                      return ([
                        filterData[key].time,
                        filterData[key].value
                      ])
                    })
                  } else {
                    myData = []
                  }
                  console.log("filter array data!!!!!!!!!!!: ", myData)
                  // console.log("res array data: ", res)
                  if (myData.length > 0) {
                    setGData(
                      [{
                        name: "T-Power",
                        data: myData
                      }]
                    )
                  }

                }).catch(err => {
                  //setIsFilterGraphData(false)
                  console.log(err)
                })
            }

            console.log("yaxis data!!", yaxis)
          }
        },
        stacked: true,
        height: 350,
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
    },
    series: [
      {
        name: "T-Power",
        data: [
          [1361487600000, 5],
          [1461746800000, 10],
          [1561833200000, 15],
          [1671919600000, 20],
          [1465487600000, 15],
          [1463746800000, 30],
          [1421833200000, 45],
          [1661919600000, 50],

        ]
      }
    ]
  });



  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("call timeout")
  //     if (chartRef) {
  //       chartRef.current.chart.ctx.appendData([
  //         {
  //           data: [
  //             [1551833200000, 150],
  //             [1161919600000, 200],
  //           ]
  //         }
  //       ]);
  //     }
  //   }, 10000)
  // }, []);


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


