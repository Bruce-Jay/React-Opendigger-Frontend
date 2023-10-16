import React, { FormEvent, useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import { Button, Form, Input, Select, Tag } from "antd";

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

    // 处理选择器标签
    const tagRender = (props: any) => {
        const {label, value, closable, onClose} = props
        // console.log(props);
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
            >
                {label}
            </Tag>
        )
    }

    // useEffect(() => {
    //     userForm.setFieldsValue({user: 'Bruce-Jay'})
    // }, [])

    return (
        <Form
            form={userForm}
            name="basic"
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            style={{ maxWidth: 600 }}
            initialValues={{ user: 'Bruce-Jay', metric: ['activity', 'openrank'] }}
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
                    mode="multiple"
                    tagRender={tagRender}
                    options={[
                        {value: "activity", label: "activity"},
                        {value: "openrank", label: "openrank"},
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
