import React, { useEffect } from "react";

import * as echarts from "echarts";
import { useAppContext } from "./AppContext";


const LineChart: React.FC = () => {
    const chartRef = React.useRef<HTMLDivElement>(null);

    const {rawData, metric} = useAppContext()
    let dataArr: Array<any> = []
    let displayDataArr: Array<any> = []
    // 不为空对象，否则会报错
    if (Object.keys(rawData).length !== 0) {
        dataArr = Object.entries(rawData)
        // console.log(dataArr[dataArr.length - 1][0])
        
        displayDataArr = dataArr.filter((item) => {
            return item[0].includes('-') && !item[0].includes('raw')
        })
    }
    

    useEffect(() => {
        const chart = echarts.init(chartRef.current!);

        const chartTitle = metric ? `${metric} Chart` : "Chart"

        let option: echarts.EChartOption = {
            title: {
                text: chartTitle,
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: "category",
                name: "Time"
            },
            yAxis: {
                type: "value",
                name: "Value"
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    minSpan: 5
                },
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    minSpan: 5,
                    
                }
            ],
            series: [
                {
                    data: displayDataArr,
                    type: "bar",
                },
            ],
        };

        chart.setOption(option);

        return () => {
            chart.dispose();
        };
    }, [rawData]);

    return (
        <div style={{ width: "100%", height: "400px" }} ref={chartRef}></div>
    );
};

export default LineChart;
