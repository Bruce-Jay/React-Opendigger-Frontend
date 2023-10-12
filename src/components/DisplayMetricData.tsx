import { post } from "../request";
import React, { useEffect } from "react";
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import { useAppContext } from "./AppContext";

interface FormData {
    repository?: string;
    user?: string;
    metric?: string;
}

async function getOpendiggerContent(formData: FormData) {
    if (!formData.repository && !formData.user) {
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
