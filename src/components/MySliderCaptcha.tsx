import SliderCaptcha, {ActionType} from "rc-slider-captcha";
import { useState, useRef } from "react";
import { sleep } from "ut2";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Modal } from "antd";

import verifyBg from "../assets/1bg@2x.jpg";
import verifyPuzzle from "../assets/1puzzle@2x.png";
import {post} from '../request/index'

const LoginSliderCaptcha = ({open, setOpen, actionRef, loginForm}: {open: any, setOpen: any, actionRef: any, loginForm: any}) => {
    const navigate = useNavigate();

    const getCaptcha: any = async () => {
        await sleep();
        return {
            bgUrl: verifyBg,
            puzzleUrl: verifyPuzzle,
        };
    };

    const verifyCaptcha = async (data: { x: number }) => {
        await sleep();
        if (data.x && data.x > 87 && data.x < 93) {
            localStorage.setItem("IsLoggedIn", "true");
            setOpen(false);
            message.info('通过验证')
            navigate('/');
            return Promise.resolve();
        }
        return Promise.reject();
    };

    return (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            title="Security Check"
            footer={false}
            centered
            width={400}
            style={{ maxWidth: "100%" }}
        >
            <div style={{ marginBottom: 10 }}>
                <button onClick={() => actionRef.current?.refresh()}>点击手动刷新</button>
            </div>
            <SliderCaptcha
                request={getCaptcha}
                onVerify={(data) => {
                    console.log('1234566778675');
                    return verifyCaptcha(data);
                }}
                actionRef={actionRef}
            />
            
        </Modal>
    );
};

const RegisterSliderCaptcha = ({open, setOpen, actionRef, registerForm}: {open: any, setOpen: any, actionRef: any, registerForm: any}) => {
    const navigate = useNavigate();

    const getCaptcha: any = async () => {
        await sleep();
        return {
            bgUrl: verifyBg,
            puzzleUrl: verifyPuzzle,
        };
    };

    const verifyCaptcha = async (data: { x: number }) => {
        await sleep();
        if (data.x && data.x > 87 && data.x < 93) {
            const res = await post("/register", registerForm)
            if (Object.values(res.data)[0] === "existed") {
                await message.error('用户名已存在')
            } else {
                console.log(res.data)
                console.log(Object.values(res.data)[0])
                navigate('/login');
                message.info('注册成功，请重新登录');
            }
            setOpen(false);
            // navigate('/')
            return Promise.resolve();
        }
        return Promise.reject();
    };

    return (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            title="Security Check"
            footer={false}
            centered
            width={400}
            style={{ maxWidth: "100%" }}
        >
            <div style={{ marginBottom: 10 }}>
                <button onClick={() => actionRef.current?.refresh()}>点击手动刷新</button>
            </div>
            <SliderCaptcha
                request={getCaptcha}
                onVerify={(data) => {
                    return verifyCaptcha(data);
                }}
                actionRef={actionRef}
            />
            
        </Modal>
    );
};

export { LoginSliderCaptcha, RegisterSliderCaptcha };
