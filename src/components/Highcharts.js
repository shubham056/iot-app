import React, { useState } from "react";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { chartOptions, dataURL } from "./includes/ChartOption";
import UserService from "../services/user.service";
import moment from "moment-timezone";


export default function HighchartsGraph(props) {
    const { isGraphDataFromSocket, graphDataFromSocket, isFilterGraphData, graphDataFromFilter, device_id } = props;

    const [options, setOptions] = useState({
        ...chartOptions,
        chart: {
            type: "line",
            zoomType: "x",
            events: {
                load: loadInitialData
            }
        },
        xAxis: {
            type: 'datetime',
            events: {
                afterSetExtremes
            },
            minRange: 3600 * 1000 // one hour
        }
    });


    function loadInitialData() {
        if (device_id != undefined) {
            UserService.GetLinkedDeviceData(device_id, "T_power_A", 'first')
                .then((res) => {
                    let powerDataFromDB = res.data.data.deviceData
                    //console.log("res Data!!!!!!!!!", powerDataFromDB)
                    let data
                    if (typeof (powerDataFromDB) != "undefined") {
                        data = Object.keys(powerDataFromDB).map(key => {
                            return ([
                               new Date(powerDataFromDB[key].time).valueOf(),
                                powerDataFromDB[key].value
                            ])
                        })
                    } else {
                        data = []
                    }
                    if (data.length > 0) {
                        console.log("Graph Data!!!!!", data)
                        setOptions({
                            series: [
                                {
                                    data
                                }
                            ],
                            navigator: {
                                series: {
                                    data: data
                                }
                            }
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    function afterSetExtremes(e) {
        const { chart } = e.target;
        chart.showLoading("Loading data from server...");
        console.log("min date", Math.round(e.min))
        const format = "daterange-initial";
        if (e.min != undefined && e.max != undefined) {
            let startDate = moment(Math.round(e.min)).format('YYYY-MM-DD HH:mm:ss')
            let endDate = moment(Math.round(e.max)).format('YYYY-MM-DD HH:mm:ss')

            UserService.GetLinkedDeviceData(device_id, "T_power_A", format, startDate, endDate)
              .then((res) => {
                // setIsGraphDataFromSocket(false)
                let data
                console.log("filter data from min and max date!!!!!!!!!!!!:", res.data.data.deviceData)
                let filterData = res.data.data.deviceData
                if (typeof (filterData) != "undefined") {
                  data = Object.keys(filterData).map(key => {
                    return ([
                      new Date(filterData[key].time).valueOf(),
                      filterData[key].value
                    ])
                  })
                } else {
                  data = []
                }
                console.log("filter array data!!!!!!!!!!!: ", data)
                if (data.length > 0) {
                    setOptions({
                        series: [{ data }]
                    });
                    chart.hideLoading();
                }

              }).catch(err => {
                console.log(err)
              })
        }
        
        // fetch(`${dataURL}?start=${Math.round(e.min)}&end=${Math.round(e.max)}`)
        //     .then((res) => res.ok && res.json())
        //     .then((data) => {
        //         setOptions({
        //             series: [{ data }]
        //         });
        //         chart.hideLoading();
        //     })
        //     .catch((error) => console.error(error.message));
    }

    return (
        <HighchartsReact
            constructorType={"stockChart"}
            highcharts={Highcharts}
            options={options}
        />
    );
}
