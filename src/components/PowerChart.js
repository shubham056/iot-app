import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";
import UserService from "../services/user.service";
import React, { useState, useEffect } from "react";
import * as zoom from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import moment from "moment-timezone";

// var res = [
//   { date: new Date("2019-08-20 10:10:10"), value: 35.98 },
//   { date: new Date("2019-08-20 10:10:15"), value: 12.49 },
//   { date: new Date("2019-08-20 10:10:20"), value: 12.93 },
//   { date: new Date("2019-08-20 10:10:25"), value: 139.89 },
//   { date: new Date("2019-08-20 10:10:30"), value: 15.6 },
//   { date: new Date("2019-08-20 10:10:35"), value: 15.6 },
// ];

export default function App(props) {
  const chartRef = React.useRef(null);
  const [gData, setGData] = useState([]);
  const [initCandles, setInitCandles] = useState([])
  const [isLoadingGraph, setisLoadingGraph] = useState(false)

  const { isGraphDataFromSocket, graphDataFromSocket, isFilterGraphData, graphDataFromFilter, device_id } = props

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
            if (myData.length > 0) {
              setGData({
                labels: myData.map((e) => e.date),
                datasets: [
                  {
                    label: "Frequency (Hz)",
                    data: myData.map((e) => e.value),
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    tension: 0,
                    pointRadius: 3,
                  }
                ]
              })
            }
            setisLoadingGraph(false)
          }).catch(err => {
            setisLoadingGraph(false)
            console.log(err)
          })
      }
    }, [device_id])

  useCustomCompareEffect(() => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@is filter data:", isFilterGraphData, "is socket data:", isGraphDataFromSocket, graphDataFromSocket)

    if (isFilterGraphData) {
      console.log("filter data:", graphDataFromFilter)
      let myData;
      if (typeof (graphDataFromFilter) != "undefined") {
        myData = Object.keys(graphDataFromFilter).map(key => {
          return ({
            date: moment(graphDataFromFilter[key].time).format("YYYY-MM-DD HH:mm:ss"),
            value: graphDataFromFilter[key].value
          })
        })
      } else {
        myData = []
      }
      console.log("filter array data: ", myData)
      // console.log("res array data: ", res)
      if (myData.length > 0) {
        setGData({
          labels: myData.map((e) => e.date),
          datasets: [
            {
              label: "Frequency (Hz)",
              data: myData.map((e) => e.value),
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              tension: 0,
              pointRadius: 3,
            }
          ]
        })
      }

      console.log("upp!!!!!!!", gData)
    }
    //Socket data
    if (isGraphDataFromSocket) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!! Graph data from socket:", graphDataFromSocket)
      if (graphDataFromSocket.length > 0) {
        let myData = graphDataFromSocket.map(item => {
          return ({
            date: moment(item.time).format("YYYY-MM-DD HH:mm:ss"),
            value: item.value
          })
        })

        setGData({
          labels: myData.map((e) => e.date),
          datasets: [
            {
              label: "Frequency (Hz)",
              data: myData.map((e) => e.value),
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              tension: 0,
              pointRadius: 3,
            }
          ]
        })
      }
      console.log("socket g data!!!!!!!", gData)
    }
  },
    [isFilterGraphData, graphDataFromFilter, isGraphDataFromSocket, graphDataFromSocket],
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
  )


  const options = {
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          //console.log("@@@@@@data",data['labels'][tooltipItem[0]['index']])
          return parseFloat(data['datasets'][0]['data'][tooltipItem['index']]).toFixed(1)
        },
        title: function (tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
          //return "Frequency (Hz)"
        },

        afterLabel: function (tooltipItem, data) {
          // var dataset = data['datasets'][0];
          // return dataset['data'][tooltipItem['index']];
        }
      },
      backgroundColor: 'darkcyan',
      titleFontSize: 14,
      titleFontColor: '#fff',
      bodyFontColor: '#fff',
      bodyFontSize: 24,
      displayColors: false
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
            displayFormats: {
              millisecond: 'HH:mm:ss.SSS',
              second: 'HH:mm:ss',
              minute: 'HH:mm',
              hour: 'HH'
            }
          }

        }
      ],
      yAxes: [
        {
          position: "right",
          ticks: {
            beginAtZero: true,
            precision: 0,
          }
        }
      ]
    },
    pan: {
      enabled: true,
      mode: "x",
      scaleMode: "x",
      overScaleMode: "x",
    },
    zoom: {
      enabled: true,
      mode: "x",
      sensitivity: 0.5
    },
  };

  return (
    <div className="App">
      {
        isLoadingGraph
          ?
          <p style={{ textAlign: 'center', padding: 108 }}>Loading...</p>
          :
          <Line data={gData} options={options} />
      }
    </div>
  );
}


