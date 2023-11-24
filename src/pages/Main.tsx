import { Row, Col, Skeleton, Alert, Radio } from "antd";
import type { TabsProps, RadioChangeEvent } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { sleep } from "ut2";

import DisplayMetricData from "../components/DisplayMetricData";
import RepoSubmitForm from "../components/RepoSubmitForm";
import UserSubmitForm from "../components/UserSubmitForm";
import LineChart from "../components/LineChart";
import NavigateBar from "../components/NavigateBar";
import { AppContextProvider } from "../components/AppContext";

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [infoType, setInfoType] = useState('repository')
    const navigate = useNavigate();

    const infoTypeChange = ({ target: { value } }: RadioChangeEvent) => {
        setInfoType(value)
    }

    useEffect(() => {
        // if (!localStorage.getItem("IsLoggedIn")) {
        //     setIsLoading(true);
        //     sleep(3000).then(() => {
        //         console.log("sleep");
        //         navigate("/login");
        //     });
        // } else {
        //     sleep(1000);
        // }
    }, []);

    return (
        <>
            {/* {isLoading ? (
                <>
                    <Alert type="error" message="请先登录, 3 秒后自动跳转至登录页" banner/>
                    <Skeleton active />
                </>
            ) :  */}
            
                <AppContextProvider>
                    <NavigateBar>
                        <Radio.Group defaultValue="repository" className="RadioStyle" onChange={infoTypeChange}>
                            <Radio.Button value="repository">Repository Info</Radio.Button>
                            <Radio.Button value="user">User Info</Radio.Button>
                        </Radio.Group>
                        <Row gutter={16}>
                            <Col span={12}>
                                {
                                    infoType === "repository" ? <RepoSubmitForm /> : <UserSubmitForm />
                                }
                                
                                <LineChart />
                            </Col>
                            <Col span={12}>
                                <DisplayMetricData />
                            </Col>
                        </Row>
                    </NavigateBar>
                </AppContextProvider>
            )
        </>
    );
};

export default Main;
