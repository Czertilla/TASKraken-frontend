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
import axios from 'axios';

import Recaptcha from 'react-recaptcha';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;

const {RC_SITEKEY} = '6LfS9IQqAAAAANnYp35ReDVzv9AqbTcmEiRTKI1o';


const UsernameField = () => {
	const [validateStatus, setValidateStatus] = useState(null)

	return (
		<Form.Item
				shouldUpdate
        name="username"
        label="username"
        tooltip="What do you want others to call you?"
				hasFeedback
				validateStatus={validateStatus}
				validateDebounce={1000}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
          () => ({
            validator(_, value) {
							console.log("check username: ", value)
							if (value === "") return Promise.reject()
							setValidateStatus("validating")
							return axios.get(`http://127.0.0.1:8000/user/check/${value}`).then((r) => {
								const isValid = value === r.data.username && !r.data.exists
								setValidateStatus(isValid ? "success" : "error")
								if (isValid)
									return Promise.resolve()
								return Promise.reject(new Error("this username already exists"))
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
      axios.post("http://localhost:8000/auth/register", values)
      .then((response) => {
        axios.post("http://127.0.0.1:8000/auth/request-verify-token", {email: response.data.email})
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
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
          () => ({
            validator(_, value) {
              if (existingEmail===value){
                return Promise.reject(new Error("this email already registered"))
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
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
        >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
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
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};