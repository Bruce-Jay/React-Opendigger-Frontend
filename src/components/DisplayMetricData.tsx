import { post } from "../request";
import React, { useEffect } from "react";
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import { useAppContext } from "./AppContext";

interface FormData {
    repository?: string;
    user?: string;
    metric?: string[];
}

async function getOpendiggerContent(formData: FormData) {
    if (!formData.repository && !formData.user) {
        return {};
    }
    const res = await post("/submit", formData);
    return res.data;
}

const DisplayMetricData = () => {
    const { formData, setRawData, rawData, metric } = useAppContext();
    const metricArr: React.MutableRefObject<string[]> = React.useRef([])
    useEffect(() => {
        metricArr.current = typeof metric === 'string' ? [metric] : metric
    }, [metric])
    let filteredRawData: Array<Array<[string, number]>> = []
    let items: CollapseProps['items'] = []

    if (rawData.length) {
        rawData.map((item) => {
            let dataArr: Array<[string, number]> = []
            // 不为空对象，否则会报错
            if (Object.keys(item).length !== 0) {
                dataArr = Object.entries(item)
                dataArr = dataArr.filter((item) => {
                    return item[0].includes('-') && !item[0].includes('raw')
                })
            }
            filteredRawData.push(dataArr)
        })

        for (let i = 0; i < metricArr.current.length; i++) {
            items.push({
                key: i,
                label: metricArr.current[i],
                children: 
                    <div className="scrollable-container">
                        {filteredRawData[i].map(([date, value]) => (
                            <div key={date}>
                                {date}: {value}
                            </div>
                        ))}
                    </div>
            })
        }
    }
    

    useEffect(() => {
        getOpendiggerContent(formData).then((data: any) => {
            setRawData(data);
            console.log('raw', rawData);
        });
        console.log('display', formData)
    }, [formData]);

    return (
        
        <Collapse items={items} />
    );
};

export default DisplayMetricData;
