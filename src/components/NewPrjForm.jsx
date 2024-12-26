import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  Row,
  Select,
	Switch,
} from 'antd';

import { useNavigate } from 'react-router-dom';
import { api } from '../utils/axiosConfig';
import { cr_roles_rights, cr_struct_rights, edit_other_rights, reject_task_rights, send_petition_rights, send_task_rights } from './rights';

const MAX_DESC_LENGTH = 512;


export function NewPrjForm() {
    const [form] = Form.useForm()
    const [submitLoading, setSubmitLoading] = useState(false)
		const [isDisable, setDisable] = useState()
    const navigate = useNavigate()  

		const onFinish = (values) => {
            console.log("registerData", values)
            api.post(
                '/project/new', 
                {},
                {
                    headers: {
                        'accept': 'application/json',
                    },
                    params: values
                }
            )
            .then(response => {
                console.log(response.data);
                
                api.get(`/project/${response.data.id}/select`)
                .then(() => {navigate("/tasks/my")})
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 500) {
                            console.error('Internal Server Error:', error.response.data)
                            navigate("/internal")
                    }
                    console.error('Error:', error.response?.data || error.message);
                    if (error.response.status == 401 && error.response.data.detail === "Unauthorized"){
                        navigate("/auth/jwt/login")
                    }
                }
                else
                    navigate("/internal")
                })
            .finally(() => {
                setSubmitLoading(false)
            })
		};

		const onFinishFailed = () => {
				setSubmitLoading(false)
		}

		const onClick = () => {
				setSubmitLoading(true)
		}

		useEffect(() => {
				setDisable(submitLoading)
		}, [submitLoading])

		return (
			<Form
				form={form}
				name="org_register"
				layout='vertical'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				scrollToFirstError
			>

				<Form.Item
					name="name"
					label="Название" //TODO I18
					shouldUpdate
					validateTrigger={["onChange"]}
					rules={[
						{
							max: 128,
							message: "Слишком длинное название" //TODO I18
						},
						{
							required: true,
							message: 'Пожалуйста, введите название организации', //TODO I18
						},
					]}
				>
					<Input/>
				</Form.Item>

				<Form.Item
					name="desctription"
					label="Описание"
					rules={[
						{
							max: MAX_DESC_LENGTH,
							message: "Слишком длинное описание" //TODO I18
						}
					]}
					hasFeedback
					>
					<Input.TextArea showCount maxLength={MAX_DESC_LENGTH} />
				</Form.Item>

				<Form.Item
					name="deadline"
					label="Дедлайн"
					valuePropName="dateStrings"
					getValueFromEvent={(_, dateStr) => dateStr}
				>
					<DatePicker
						showTime
						format={"YYYY-MM-DDTHH:mm:ss.0Z"}
					/>
				</Form.Item>

				<Form.Item 
					className='flex justify-center'
				>
					<Button
						type="primary" 
						htmlType="submit"
						iconPosition='end'
						loading={submitLoading}
						disabled={isDisable}
						onClick={onClick}
					>
						Зарегистрировать
					</Button>
				</Form.Item>
			</Form>
		);
};