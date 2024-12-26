import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
} from 'antd';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisable, setDisable] = useState()
  const navigate = useNavigate()

  const onFinish = (values) => {
			const data = {
				grant_type: "",
				username: values.username,
				password: values.password,
				scope: "",
				client_id: "",
				client_secret: ""
			} 
			axios({
				method: 'post',
				url: `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth/jwt/login`,
				headers: {
					accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				}, 
				data: values,
				withCredentials: true 
			})
      .then((response) => {
				navigate("/tasks")
      })
      .catch((error) => {
				console.error(error.response.data)
        if (error.response.status == 400 && error.response.data.detail === "LOGIN_BAD_CREDENTIALS"){
          console.error(error.response.data)
        }
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

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form
      form={form}
      name="login"
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="E-mail"
        shouldUpdate
        validateTrigger={["onChange"]}
        rules={[
          {
            type: 'email',
            message: 'Это не электронная почта!',
          },
          {
            required: true,
            message: 'Пожалуйста, введите адрес электронной почты!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль!',
          },
        ]}
        hasFeedback
        >
        <Input.Password/>
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
          Вход
        </Button>
      </Form.Item>
    </Form>
  );
};