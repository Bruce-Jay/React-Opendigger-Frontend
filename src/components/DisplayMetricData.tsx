import { post } from "../request";
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import { useAppContext } from "./AppContext";
import * as echarts from "echarts";
import SubmitForm from "./SubmitForm";

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
    const { formData, setRawData, rawData } = useAppContext();

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'OpenRank',
            children: 
                    <div className="scrollable-container">
                        {Object.entries(rawData).map(([date, value]) => (
                            <div key={date}>
                                {date}: {value}
                            </div>
                        ))}
                    </div>
        },
        {
            key: '2',
            label: 'Activity',
            children: <p>This is a test panel</p>
        }
    ]
    

    useEffect(() => {
        getOpendiggerContent(formData).then((data: any) => {
            setRawData(data);
        });
        console.log('display', formData)
    }, [formData]);

    return (
        
        <Collapse items={items} />
            // <div>
            //     {Object.entries(rawData).map(([date, value]) => (
            //         <div key={date}>
            //             {date}: {value}
            //         </div>
            //     ))}
            // </div>
        
    );
};

export default DisplayMetricData;
