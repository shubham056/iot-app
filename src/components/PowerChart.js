import React, { useEffect, useState, useRef } from "react";
import { createChart } from 'lightweight-charts';

const PowerChart = ({ powerData, powerDataFromDB}) => {
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef();
    const callOnce = useRef(true)
    useEffect(() => {
        console.log("====================== Call power chart =====================",powerDataFromDB)
        var myData = Object.keys(powerDataFromDB).map(key => {
            return powerDataFromDB[key];
        })
        //let data = Object.keys(powerDataFromDB)
        console.log("output",myData)
        console.log("powerData",powerData)
        const { date_time, total_power } = powerDataFromDB

        //if (callOnce.current) {
           // callOnce.current = false
            if(myData.length > 0){
                const chart = createChart(chartRef.current, {
                    width: 500,
                    height: 400,
                    timeScale: {
                        timeVisible: true,
                        secondsVisible: false,
                    }
                });
                const lineSeries = chart.addLineSeries();
                lineSeries.setData(myData);
                chart.timeScale().fitContent();
            }
        //}

    }, [powerData, powerDataFromDB]);

    return (
        <div ref={chartRef} />
    );
};


export default PowerChart
