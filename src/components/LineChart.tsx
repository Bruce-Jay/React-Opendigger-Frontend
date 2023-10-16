import React, { useEffect } from "react";

import * as echarts from "echarts";
import { useAppContext } from "./AppContext";

interface MetricDataKV {
    [metric: string]: Array<any>;
}


const LineChart: React.FC = () => {
    const chartRef = React.useRef<HTMLDivElement>(null);

    const {rawData, metric} = useAppContext()
    // console.log('metric', metric);
    
    let chartSeries: Array<any> = []
    // 只保留 yyyy-mm 格式的 object entries 数组
    let filteredRawData: Array<Array<[string, number]>> = []
    // 记录每一种 metric 所对应的 data
    const metricArr: React.MutableRefObject<string[]> = React.useRef([])
    useEffect(() => {
        metricArr.current = typeof metric === 'string' ? [metric] : metric
    }, [metric])
    // 将数据的种类（此处为日期）存储到一个变量中，用于后续的图表横坐标
    let xAxisData: Array<string> = []
    
    if (rawData.length) {
        rawData.map((item) => {
            let dataArr: Array<any> = []
            // 不为空对象，否则会报错
            if (Object.keys(item).length !== 0) {
                dataArr = Object.entries(item)
                dataArr = dataArr.filter((item) => {
                    return item[0].includes('-') && !item[0].includes('raw')
                })
            }
            filteredRawData.push(dataArr)
        })
        console.log('filteredRawData', filteredRawData);
        // filteredRawData[0].map((item: any) => {
        //     console.log(item);
        // })
    
        
        for (let i = 0; i < filteredRawData.length; i++) {
            for (let j = 0; j < filteredRawData[i].length; j++) {
                const element = filteredRawData[i][j][0];
                if (!xAxisData.includes(element)) {
                    xAxisData.push(element)
                }
            }
            
        }
        xAxisData.sort((a, b) => Date.parse(a) - Date.parse(b))
    
        
        let metricDataKV: MetricDataKV = {}
        for (let i = 0; i < metricArr.current.length; i++) {
            metricDataKV[metricArr.current[i]] = filteredRawData[i]
        }
    
        
        for (let i = 0; i < metricArr.current.length; i++) {
            chartSeries.push({
                name: metricArr.current[i],
                type: "bar",
                data: filteredRawData[i],
                // markLine: {
                //     data: [{type: 'average', name: 'Avg'}]
                // },
                // markPoint: {
                //     data: [
                //         {type: 'max', name: 'Max'},
                //         {type: 'min', name: 'Min'},
                //     ]
                // }
            })
        }
    }
    
    
    

    useEffect(() => {
        const chart = echarts.init(chartRef.current!);

        const chartTitle = metric ? `${metric} Chart` : "Chart"

        let option: echarts.EChartOption = {
            title: {
                text: chartTitle,
            },
            legend: {
                data: metricArr.current,
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: "category",
                name: "Time",
                data: xAxisData
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
            series: chartSeries,
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
