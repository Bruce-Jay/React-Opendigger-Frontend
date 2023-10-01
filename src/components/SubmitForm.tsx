import React, { FormEvent } from "react";
import { useAppContext } from "./AppContext";
import { Button, Form, Input, Select } from "antd";



const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

type FieldType = {
    repository?: string;
    metric?: string;
};

const SubmitForm: React.FC = () => {
    const { formData, setFormData } = useAppContext();
    const [form] = Form.useForm();

    // 处理表单提交
    const onFinish = (values: any) => {
        console.log("Success:", values);
        setFormData(values);
    };


    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ repository: 'valhalla/valhalla', metric: 'openrank' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="repository"
                name="repository"
                rules={[{ required: true, message: "Please input your repository!" }]}
            >
                <Input defaultValue="valhalla/valhalla"/>
            </Form.Item>

            <Form.Item<FieldType>
                label="metric"
                name="metric"
                rules={[{ required: true, message: "Please input your metric!" }]}
            >
                <Select 
                    defaultValue="openrank"
                    style={{width: 300}}
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

export default SubmitForm;
