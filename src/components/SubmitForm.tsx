import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppContext } from "./AppContext";
import { post } from "../request";

const SubmitForm = () => {
    
    const {userInput, setUserInput, formData, setFormData} = useAppContext();

    // 处理表单字段变化
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInput({ ...userInput, [name]: value });
    };

    // 处理表单提交
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setFormData(userInput);
        // try {
        //     const response = await post("/submit", formData);
        //     console.log(response.data);
        // } catch (error) {
        //     console.error('网络错误', error);
        // }
    };

    return (
        <div>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="repository">Repository: </label>
                    <input type="text" id="repository" name="repository" value={userInput.repository} onChange={handleInputChange}></input>
                    <div>Recommended Repo: valhalla/valhalla</div>
                </div>
                <div>
                    <label htmlFor="metric">Metric: </label>
                    <input type="text" id="metric" name="metric" value={userInput.metric} onChange={handleInputChange}></input>
                    <div>Recommended Metric: openrank</div>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
};

export default SubmitForm;
