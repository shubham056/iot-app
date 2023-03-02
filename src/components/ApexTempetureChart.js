import { useCustomCompareEffect } from "use-custom-compare";
import isEqual from "lodash/isEqual";
import UserService from "../services/user.service";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReactApexChart from "react-apexcharts";

export default function App(props) {
    const { istempetureDataFromSocket, tempetureDataFromSocket, isFilterTemData, tempetureDataFromFilter, device_id } = props;
    const chartRef = useRef();
    const [gData, setGData] = useState([]);
    const [isLoadingGraph, setisLoadingGraph] = useState(false)
    const PER_PAGE = 2500;
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const format = "daterange-initial";

    const firstdate = moment().startOf('month').unix();
    //console.log("firstdate", firstdate);
    const lastdate = moment().endOf('month').unix();
    //console.log("lastdate", lastdate);
    const [chartConfig] = useState({
        options: {
            chart: {
                id: "total-power-chart",
                type: "line",
                // min: firstdate,
                // max: lastdate,
                // events: {
                //   scrolled: function (chartContext, { xaxis }) {
                //     console.log("xaxis data pan scroll!!", xaxis)
                //     console.log("xaxis data pan scroll!!", xaxis, moment(xaxis.min).format('YYYY-MM-DD HH:mm:ss'), moment(xaxis.max).format('YYYY-MM-DD HH:mm:ss'))

                //     if (xaxis.min != undefined && xaxis.max != undefined) {
                //       let startDate = moment(xaxis.min).format('YYYY-MM-DD HH:mm:ss')
                //       let endDate = moment(xaxis.max).format('YYYY-MM-DD HH:mm:ss')

                //       UserService.GetLinkedDeviceTemperatureData(device_id, "temperature", format, startDate, endDate)
                //         .then((res) => {
                //           // setIsGraphDataFromSocket(false)
                //           let myData
                //           console.log("filter data from min and max date!!!!!!!!!!!!:", res.data.data.deviceData)
                //           let filterData = res.data.data.deviceData
                //           if (typeof (filterData) != "undefined") {
                //             myData = Object.keys(filterData).map(key => {
                //               return ([
                //                 filterData[key].time,
                //                 filterData[key].Temp_A
                //               ])
                //             })
                //           } else {
                //             myData = []
                //           }
                //           console.log("filter array data!!!!!!!!!!!: ", myData)
                //           // console.log("res array data: ", res)
                //           if (myData.length > 0) {
                //             if (chartRef && chartRef.current != null) {
                //               chartRef.current.chart.ctx.updateSeries([
                //                 {
                //                   data: myData
                //                 }
                //               ]);
                //             }

                //             // setGData(
                //             //   [{
                //             //     name: "Temperature",
                //             //     data: myData
                //             //   }]
                //             // )
                //           }

                //         }).catch(err => {
                //           //setIsFilterGraphData(false)
                //           console.log(err)
                //         })
                //     }
                //   },
                //   zoomed: function (chartContext, { xaxis, yaxis }) {
                //     //console.log("chartContext data!!", chartContext)
                //     console.log("xaxis data!!", xaxis, moment(xaxis.min).format('YYYY-MM-DD HH:mm:ss'), moment(xaxis.max).format('YYYY-MM-DD HH:mm:ss'))
                //     if (xaxis.min != undefined && xaxis.max != undefined) {
                //       let startDate = moment(xaxis.min).format('YYYY-MM-DD HH:mm:ss')
                //       let endDate = moment(xaxis.max).format('YYYY-MM-DD HH:mm:ss')

                //       UserService.GetLinkedDeviceTemperatureData(device_id, "temperature", format, startDate, endDate)
                //         .then((res) => {
                //           // setIsGraphDataFromSocket(false)
                //           let myData
                //           console.log("filter data from min and max date!!!!!!!!!!!!:", res.data.data.deviceData)
                //           let filterData = res.data.data.deviceData
                //           if (typeof (filterData) != "undefined") {
                //             myData = Object.keys(filterData).map(key => {
                //               return ([
                //                 filterData[key].time,
                //                 filterData[key].Temp_A
                //               ])
                //             })
                //           } else {
                //             myData = []
                //           }
                //           console.log("filter array data!!!!!!!!!!!: ", myData)
                //           // console.log("res array data: ", res)
                //           if (myData.length > 0) {
                //             // if (chartRef && chartRef.current != null) {
                //             //   console.log("update seriesss", chartRef.current.chart.ctx.updateSeries())
                //             //   chartRef.current.chart.ctx.updateSeries([
                //             //     {
                //             //       data: myData
                //             //     }
                //             //   ]);
                //             // }
                //             setGData(
                //               [{
                //                 name: "Temperature",
                //                 data: myData
                //               }]
                //             )
                //           }

                //         }).catch(err => {
                //           //setIsFilterGraphData(false)
                //           console.log(err)
                //         })
                //     }

                //     console.log("yaxis data!!", yaxis)
                //   }
                // },
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
            // annotations: {
            //   points: [{
            //     x: new Date('2023-02-27 13:22:42'),
            //     y: 68.52,
            //     marker: {
            //       size: 5,
            //       fillColor: '#fff',
            //       strokeColor: 'red',
            //       radius: 2,
            //       cssClass: 'apexcharts-custom-class'
            //     },
            //     label: {
            //       borderColor: '#FF4560',
            //       offsetY: 0,
            //       style: {
            //         color: '#fff',
            //         background: '#FF4560',
            //       },

            //      // text: 'Point Annotation',
            //     }
            //   }]
            // },
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
                    enabled: false,
                    offsetX: 10,
                },
            },
            tooltip: {
                enabled: true,
                shared: false,
                x: {
                    format: 'dd MMM yyyy hh:mm'
                }
            },
            stroke: {
                width: 2.5,
            },
            colors: ['#1d9b9c'],
        },
        noData: {
            text: 'Loading...'
        },
        series: [
            {
                name: "Temperature",
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

    useEffect(() => {
        // get initial data from API
        if (device_id) {
            console.log("!!!!!call power initial use effect!!!!!!!!!!")
            setisLoadingGraph(true)
            UserService.GetLinkedDeviceTemperatureData(device_id, "temperature")
                .then((res) => {
                    console.log("power initial res:", res.data.data.deviceData)
                    let powerDataFromDB = res.data.data.deviceData
                    console.log("res Data!!!!!!!!!", powerDataFromDB)
                    let myData
                    if (typeof (powerDataFromDB) != "undefined") {

                        myData = Object.keys(powerDataFromDB).map(key => {
                            return ([
                                powerDataFromDB[key].time,
                                powerDataFromDB[key].Temp_A
                            ])
                        })
                    } else {
                        myData = []
                    }
                    if (myData.length > 0) {
                        console.log("Graph Data!!!!!", myData)
                        setData([{
                            name: "Temperature",
                            data: myData
                        }])
                        let pageCount = (data.length > 0) ? Math.ceil(data[0].data.length / PER_PAGE) : 1
                        setCurrentPage(pageCount - 1)
                        // setGData(
                        //   [{
                        //     name: "Temperature",
                        //     data: myData
                        //   }]
                        // )
                    }
                    setisLoadingGraph(false)
                }).catch(err => {
                    setisLoadingGraph(false)
                    // console.log(err)
                })
        }
    }, [device_id])

    useCustomCompareEffect(() => {
        if (isFilterTemData) {
            let myData;
            if (typeof (tempetureDataFromFilter) != "undefined") {
                myData = Object.keys(tempetureDataFromFilter).map(key => {
                    return ([
                        tempetureDataFromFilter[key].time,
                        tempetureDataFromFilter[key].Temp_A
                    ])
                })
            } else {
                myData = []
            }
            console.log("filter array data: ", myData)
            if (myData.length > 0) {
                setData([{
                    name: "Temperature",
                    data: myData
                }])
                // setGData(
                //   [{
                //     name: "Temperature",
                //     data: myData
                //   }]
                // )
            }
        }
        //Socket data
        if (istempetureDataFromSocket) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!! Graph data from socket:", tempetureDataFromSocket)
            if (tempetureDataFromSocket.length > 0) {
                let myData = tempetureDataFromSocket.map(item => {
                    return ([
                        item.time,
                        item.Temp_A
                    ])
                })
                // if (myData.length > 0) {
                //   setData([{
                //     name: "Temperature",
                //     data: myData
                //   }])
                // }
                //get last index of array
                let pageCount = (data.length > 0) ? Math.ceil(data[0].data.length / PER_PAGE) : 0
                console.log('last pageCount', pageCount)
                if (chartRef && chartRef.current != null && pageCount - 1 == currentPage) {
                    chartRef.current.chart.ctx.appendData([
                        {
                            data: myData
                        }
                    ]);
                }
                console.log("socket g data!!!!!!!", myData)
            }

        }
    },
        [isFilterTemData, tempetureDataFromFilter, istempetureDataFromSocket, tempetureDataFromSocket],
        (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
    )

    const offset = currentPage * PER_PAGE;
    const currentPageData = (data.length > 0) ? data[0].data.slice(offset, offset + PER_PAGE) : [].slice(offset, offset + PER_PAGE)
    //const currentPageData = data[0].data.slice(offset, offset + PER_PAGE)
    console.log("currentPageData", currentPageData)

    const pageCount = (data.length > 0) ? Math.ceil(data[0].data.length / PER_PAGE) : 1
    //const pageCount = Math.ceil(data.length / PER_PAGE);
    console.log("pageCount", data, pageCount)

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    // let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    // let barnumber = 10;
    // var page = 1;
    // let lastPageNum = data.length / barnumber;
    // let viewdata = data.slice((page - 1) * barnumber, page * barnumber);

    // const handleNext = () => {
    //   if (page < lastPageNum) {
    //     page++;
    //   }
    //   viewdata = data.slice((page - 1) * barnumber, page * barnumber);
    //   console.log(viewdata)
    // }
    // const handlePrevious = () => {
    //   if (page > 1) {
    //     page--;
    //   }
    //   viewdata = data.slice((page - 1) * barnumber, page * barnumber);
    //   console.log(viewdata)
    // }

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
                    <>
                        {/* <button id="prev" className="btn btn-primary btn-sm" onClick={handlePrevious}>prev</button>
            <button id="next" className="btn btn-info btn-sm" onClick={handleNext}>next</button> */}

                        <ReactApexChart height={350} ref={chartRef} options={chartConfig.options} series={[{
                            name: "Temperature",
                            data: currentPageData
                        }]} />
                        <ReactPaginate
                            nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 10 }} />}
                            previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 10 }} />}
                            renderOnZeroPageCount={null}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            initialPage={currentPage}
                            activeClassName={'active'}
                            containerClassName={'pagination justify-content-center'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                        />
                    </>
            }
        </>
    )

}


