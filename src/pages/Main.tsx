import { Row, Col, Skeleton, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { sleep } from "ut2";

import DisplayMetricData from "../components/DisplayMetricData";
import SubmitForm from "../components/SubmitForm";
import LineChart from "../components/LineChart";
import TabBar from "../components/TabBar";
import { AppContextProvider } from "../components/AppContext";

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!localStorage.getItem("IsLoggedIn")) {
            setIsLoading(true);
            sleep(3000).then(() => {
                console.log("sleep");
                navigate("/login");
            });
        } else {
            sleep(1000);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <>
                    <Alert type="error" message="请先登录, 3 秒后自动跳转至登录页" banner/>
                    <Skeleton active />
                </>
            ) : (
                <AppContextProvider>
                    <TabBar>
                        <Row gutter={16}>
                            <Col span={12}>
                                <SubmitForm />
                                <LineChart />
                            </Col>
                            <Col span={12}>
                                <DisplayMetricData />
                            </Col>
                        </Row>
                    </TabBar>
                </AppContextProvider>
            )}
        </>
    );
};

export default Main;
