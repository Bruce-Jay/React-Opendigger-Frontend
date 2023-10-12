import React, { FormEvent, useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import { Button, Form, Input, Select } from "antd";

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

type FieldType = {
    user?: string;
    metric?: string;
};

const UserSubmitForm = (props: any) => {
    const { formData, setFormData } = useAppContext();
    const [userForm] = Form.useForm();
    
    // 处理表单提交
    const onFinish = (values: any) => {
        console.log("Success:", values);
        setFormData(values);
    };

    useEffect(() => {
        userForm.setFieldsValue({user: 'Bruce-Jay'})
    }, [])

    return (
        <Form
            form={userForm}
            name="basic"
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            style={{ maxWidth: 600 }}
            initialValues={{ repository: 'valhalla/valhalla', metric: 'openrank' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="user"
                name="user"
                rules={[{ required: true, message: "Please input the username!" }]}
            >
                <Input  />
            </Form.Item>

            <Form.Item<FieldType>
                label="metric"
                name="metric"
                rules={[{ required: true, message: "Please input your metric!" }]}
            >
                <Select 
                    defaultValue="openrank"
                    
                    options={[
                        {value: "openrank", label: "openrank"},
                        {value: "activity", label: "activity"}
                    ]}
                />
            </Form.Item>
            
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserSubmitForm;
