import React, { useRef, useState } from "react";
import { Form, Input, Button, Tabs, Card, message } from "antd";
import type { TabsProps } from "antd";
import { ActionType } from "rc-slider-captcha";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../index.css'
import {LoginSliderCaptcha, RegisterSliderCaptcha} from "../components/MySliderCaptcha";
import {post} from '../request/index'


const LoginAndRegister = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const actionRef = useRef<ActionType>();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState<any>({})
    const [registerForm, setRegisterForm] = useState<any>({})
    // const [messageApi, contextHolder] = message.useMessage();


    const onFinishLogin = async (values: any) => {
        setLoginForm(values)
        const res = await post("/loginVerify", values)
        console.log(Object.values(res.data))
        if (Object.values(res.data)[0] !== "incorrect") {
            setOpenLogin(true);
            actionRef.current?.refresh();
            
        } else {
            message.error('用户名或密码错误')
        }
        
    };

    const onFinishRegister = async (values: any) => {
        setRegisterForm(values)
        setOpenRegister(true);
        actionRef.current?.refresh();
        // console.log('通过验证')
        // console.log(values)
        // const res = await post("/register", values)
        // if (Object.values(res.data)[0] === "existed") {
        //     await message.error('用户名已存在')
        // } else {
        //     console.log(res.data)
        //     console.log(Object.values(res.data)[0])
        //     navigate('/login');
        //     await message.info('注册成功，请重新登录');
        // }
        
    };

    const LoginForm = () => {
        return (
            <Form name="login-form" onFinish={onFinishLogin}>
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: "请输入用户名",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item style={{ display: "grid", placeItems: "center" }}>
                    <Button type="primary" htmlType="submit">
                        &emsp;登录&emsp;
                    </Button>
                    &emsp;&emsp;
                    <Button htmlType="reset">
                        &emsp;重置&emsp;
                    </Button>
                </Form.Item>
            </Form>
        );
    };

    const RegisterForm = () => {
        return (
            <Form name="register-form" onFinish={onFinishRegister}>
                <Form.Item
                    name="newUsername"
                    label="新用户名"
                    rules={[
                        {
                            required: true,
                            message: "请输入新用户名",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="新密码"
                    rules={[
                        {
                            required: true,
                            message: "请输入新密码",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item style={{ display: "grid", placeItems: "center" }}>
                    <Button type="primary" htmlType="submit">
                        &emsp;注册&emsp;
                    </Button>
                    &emsp;&emsp;
                    <Button htmlType="reset">
                        &emsp;重置&emsp;
                    </Button>
                </Form.Item>
            </Form>
        );
    };

    const items: TabsProps["items"] = [
        {
            key: "login",
            label: "登录",
            children: <LoginForm />,
        },
        {
            key: "register",
            label: "注册",
            children: <RegisterForm />,
        },
    ];

    return (
        <div className="loginDiv">
            <Card style={{ width: 500 }}>
                <Tabs items={items} centered />
            </Card>
            <LoginSliderCaptcha open={openLogin} setOpen={setOpenLogin} actionRef={actionRef} loginForm={loginForm}/>
            <RegisterSliderCaptcha open={openRegister} setOpen={setOpenRegister} actionRef={actionRef} registerForm={registerForm}/>
        </div>
    );
};

export default LoginAndRegister;
