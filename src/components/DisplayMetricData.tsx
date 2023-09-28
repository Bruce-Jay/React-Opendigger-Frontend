import { post } from "../request";
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import { useAppContext } from "./AppContext";
import echarts from "echarts";

interface FormData {
    repository: string;
    metric: string;
}

interface ChartProps {
    data: { [key: string]: string };
}

async function getOpendiggerContent(formData: FormData) {
    if (!formData.repository || !formData.metric) {
        return {};
    }
    const res = await post("/submit", formData);
    return res.data;
}

const DisplayMetricData = () => {
    const [rawData, setRawData] = useState<{ [key: string]: number }>({});
    const { formData } = useAppContext();

    useEffect(() => {
        getOpendiggerContent(formData).then((data: any) => {
            setRawData(data);
        });
    }, [formData]);

    return (
        <>
            <div>
                {Object.entries(rawData).map(([date, value]) => (
                    <div key={date}>
                        {date}: {value}
                    </div>
                ))}
            </div>
        </>
    );
};

export default DisplayMetricData;
