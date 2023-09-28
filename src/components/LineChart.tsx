import React, { useEffect } from "react";

import * as echarts from "echarts";

const LineChart = () => {
    const chartRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current!);

        let option: echarts.EChartOption = {
            title: {
                text: "示例图表",
            },
            xAxis: {
                type: "category", // explicitly set the type property to "category"
                data: ["A", "B", "C", "D", "E"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [5, 10, 15, 20, 25],
                    type: "bar",
                },
            ],
        };

        chart.setOption(option);

        return () => {
            chart.dispose();
        };
    }, []);

    return (
        <div style={{ width: "100%", height: "400px" }} ref={chartRef}></div>
    );
};

export default LineChart;
