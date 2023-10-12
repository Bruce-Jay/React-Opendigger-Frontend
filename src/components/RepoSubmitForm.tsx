import React, { FormEvent } from "react";
import { useAppContext } from "./AppContext";
import { Button, Form, Input, Select, Tag } from "antd";
import type {SelectProps} from 'antd';


const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

type FieldType = {
    repository?: string;
    metric?: string;
};

const RepoSubmitForm: React.FC = () => {
    const { formData, setFormData, setMetric } = useAppContext();
    const [form] = Form.useForm();

    // 处理表单提交
    const onFinish = (values: any) => {
        console.log("Success:", values);
        setFormData(values);
        setMetric(values.metric)
    };

    // 处理选择器标签
    const tagRender = (props: any) => {
        const {label, value, closable, onClose} = props
        console.log(props);
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


    return (
        <Form
            form={form}
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
                    defaultValue={["openrank"]}
                    mode="multiple"
                    tagRender={tagRender}
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

export default RepoSubmitForm;
