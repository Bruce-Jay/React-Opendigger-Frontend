import React, { useEffect } from "react";

import * as echarts from "echarts";
import { useAppContext } from "./AppContext";


const LineChart: React.FC = () => {
    const chartRef = React.useRef<HTMLDivElement>(null);

    const {rawData} = useAppContext()
    let dataArr: Array<any> = []
    // 不为空对象，否则会报错
    if (Object.keys(rawData).length !== 0) {
        dataArr = Object.entries(rawData)
        // console.log(dataArr[dataArr.length - 1][0])
        
        if(dataArr[dataArr.length - 1][0].includes('raw')) {
            dataArr = dataArr.slice(0, dataArr.length - 1)
            console.log(dataArr)
        }
    }
    

    useEffect(() => {
        const chart = echarts.init(chartRef.current!);

        // const dates = Object.keys(rawData).map((dateString) => new Date(dateString))

        let option: echarts.EChartOption = {
            title: {
                text: "示例图表",
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
            series: [
                {
                    data: dataArr,
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
