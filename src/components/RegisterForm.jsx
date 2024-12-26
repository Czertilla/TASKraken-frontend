import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { api } from '../utils/axiosConfig';

import Recaptcha from 'react-recaptcha';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/axiosConfig';


const { Option } = Select;

const {RC_SITEKEY} = '6LfS9IQqAAAAANnYp35ReDVzv9AqbTcmEiRTKI1o';


const UsernameField = () => {
	const [validateStatus, setValidateStatus] = useState(null)

	return (
		<Form.Item
				shouldUpdate
        name="username"
        label="username"
        tooltip="Как Вы хотите, чтобы Вас назввали?"
				hasFeedback
				validateStatus={validateStatus}
				validateDebounce={1000}
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите имя!',
            whitespace: true,
          },
          () => ({
            validator(_, value) {
							console.log("check username: ", value)
							if (value === "") return Promise.reject()
							setValidateStatus("validating")
							return api.get(`/user/check/${value}`).then((r) => {
								const isValid = value === r.data.username && !r.data.exists
								setValidateStatus(isValid ? "success" : "error")
								if (isValid)
									return Promise.resolve()
								return Promise.reject(new Error("это имя уже занято"))
							})
            },
          }),
        ]}
      >
        <Input/>
      </Form.Item>
	);
}

export function RegisterForm() {
  const [form] = Form.useForm();
  const [existingEmail, setExistingEmail] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisable, setDisable] = useState()
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log("registerData", values)
      api.post("http://localhost:8000/auth/register", values)
      .then((response) => {
        api.post("http://127.0.0.1:8000/auth/request-verify-token", {email: response.data.email})
        localStorage.setItem("sendVerifyTimeout", "90")
        navigate(`/auth/verify/${response.data.email}`)
      })
      .catch((error) => {
        if (error.response.status == 400 && error.response.data.detail === "REGISTER_USER_ALREADY_EXISTS"){
          console.error(values.email, "already exists")
          setExistingEmail(values.email)
          console.log(form)
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

  useEffect(() =>{
    if (existingEmail != "")
      form.validateFields(["email"])
  }, [existingEmail])
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
      name="register"
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        shouldUpdate
        validateTrigger={["onChange"]}
        rules={[
          {
            type: 'email',
            message: 'не является почтой!',
          },
          {
            required: true,
            message: 'Пожалуйста, введите электронную почту!',
          },
          () => ({
            validator(_, value) {
              if (existingEmail===value){
                return Promise.reject(new Error("Эта почта уже зарегистрирована"))
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input/>
      </Form.Item>

      <UsernameField/>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, придумайте пароль!',
          },
        ]}
        hasFeedback
        >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтверждение пароля"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста, подтвердите пароль!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


      {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item> */}

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Необходимо подтвердить')),
          },
        ]}
      >
        <Checkbox>
          Я прочитал(а) <a href="">пользовательское соглашение</a>
        </Checkbox>
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
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};