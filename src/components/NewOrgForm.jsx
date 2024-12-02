import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
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


const TemplateDropdown = (props) => {
		const [selectedKey, setSelectedKey] = useState('gendir')
		const { form } = props

		useEffect(() => {
				switch (selectedKey) {
					case "ordinary":
						var crStructRight = cr_struct_rights[3] // TODO compare with back
						var crRoleRight = cr_roles_rights[6]
						var snTaskRight = send_task_rights[4]
						var snReportRight = true
						var snPetitRight = send_petition_rights[4]
						var rjTaskRight = reject_task_rights[2]
						var crProjectRight = false
						var edOtherRight = edit_other_rights[3]
						var edSelfRight = false
						break;
					case "head":
						var crStructRight = cr_struct_rights[2]
						var crRoleRight = cr_roles_rights[3]
						var snTaskRight = send_task_rights[2]
						var snReportRight = true
						var snPetitRight = send_petition_rights[3]
						var rjTaskRight = reject_task_rights[1]
						var crProjectRight = false
						var edOtherRight = edit_other_rights[1]
						var edSelfRight = false
						break;
					case "hr":
						var crStructRight = cr_struct_rights[3]
						var crRoleRight = cr_roles_rights[0]
						var snTaskRight = send_task_rights[4]
						var snReportRight = true
						var snPetitRight = send_petition_rights[4]
						var rjTaskRight = reject_task_rights[2]
						var crProjectRight = false
						var edOtherRight = edit_other_rights[1]
						var edSelfRight = false
						break;
					case "gendir":
						var crStructRight = cr_struct_rights[0]
						var crRoleRight = cr_roles_rights[0]
						var snTaskRight = send_task_rights[0]
						var snReportRight = true
						var snPetitRight = send_petition_rights[0]
						var rjTaskRight = reject_task_rights[0]
						var crProjectRight = true
						var edOtherRight = edit_other_rights[0]
						var edSelfRight = true
						break;
					default:
						return;
				}
			form.setFieldsValue({
				can_create_substructures: crStructRight.value,
				can_create_subordinates: crRoleRight.value,
				can_send_task: snTaskRight.value,
				can_send_report: snReportRight,
				can_send_petition: snPetitRight.value,
				can_reject_task: rjTaskRight.value,
				can_create_project: crProjectRight,
				can_edit_other_rights: edOtherRight.value,
				can_edit_oneself_rights: edSelfRight
			})
		}, [selectedKey])

		const options = [
			{
				value: "ordinary",
				label: "обычный" // TODO I18
			}, 
			{
				value: "head",
				label: "Глава отдела" // TODO I18
			}, 
			{
				value: "hr",
				label: "Эйчар" // TODO I18
			}, 
			{
				value: 'gendir',
				label: "Генеральный директор" // TODO I18
			}
		]

		const onChange = (value) => {
				setSelectedKey(value);
		}

		return (
			<Form.Item
				name="template"
				label="Шаблон прав" // TODO I18
			>
				<Select
					options={options}
					defaultValue={options[3].value}
					onChange={onChange}
				/>
			</Form.Item>

		)
}

export function NewOrgForm() {
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisable, setDisable] = useState()
	const navigate = useNavigate()

		const onFinish = (values) => {
				console.log("registerData", values)
				api.post(
					'/struct/regist', 
					{}, // Тело запроса пустое, как указано в `-d ''`
					{
						headers: {
							'accept': 'application/json',
						},
						params: values
					}
				)
					.then(response => {
						console.log(response.data);
						
						api.get(`role/${response.data.gen_dir_id}/select`)
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

				<Divider>Организация</Divider>

				<Form.Item
					name="name"
					label="Название" //TODO I18
					shouldUpdate
					validateTrigger={["onChange"]}
					rules={[
						{
							max: 64,
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
							required: true,
							message: 'Пожалуйста, введите описание организации', //TODO I18
						},
						{
							max: MAX_DESC_LENGTH,
							message: "Слишком длинное описание" //TODO I18
						}
					]}
					hasFeedback
					>
					<Input.TextArea showCount maxLength={MAX_DESC_LENGTH} />
				</Form.Item>

				<Divider>Главная роль</Divider>

				<Form.Item
					name="gen_dir_name"
					label="Имя главной роли" //TODO I18
					tooltip="Главная роль управляет всей организацией, корневая в иерархии" // TODO I18
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите имя" //TODO I18
						},
						{
							max: 64,
							message: "Слишком длинное имя" //TODO I18
						}
					]}
				>
					<Input/>
				</Form.Item>

				<TemplateDropdown form={form}/>

				<Form.Item
					name="can_create_substructures"
					label="Создание подструктур" // TODO I18
					tooltip="Какие подструктуры можно будет создавать в этой роли" // TODO I18
					valuePropName="value"
				>
					<Select
						options={cr_struct_rights}
					/>
				</Form.Item>

				<Form.Item
					name="can_create_subordinates"
					label="Создание ролей" // TODO I18
					tooltip="Какие роли можно будет создавать в этой роли" // TODO I18
					valuePropName="value"
				>
					<Select
						options={cr_roles_rights}
					/>
				</Form.Item>

				<Form.Item
					name="can_send_task"
					label="Назначение задач" // TODO I18
					tooltip="Кому можно будет назначать задачи в этой роли" // TODO I18
					valuePropName="value"
				>
					<Select
						options={send_task_rights}
					/>
				</Form.Item>

				<Form.Item
					name="can_send_report"
					label="Отправка отчетов" // TODO I18
					tooltip="Можно ли будет отправлять отчеты в этой роли" // TODO I18
					valuePropName="checked"
				>
					<Switch
					/>
				</Form.Item>

				<Form.Item
					name="can_send_petition"
					label="Оспаривание задач" // TODO I18
					tooltip="Чьи поручения можно будет оспаривать в этой роли" // TODO I18
					valuePropName="value"
				>
					<Select
						options={send_petition_rights}
					/>
				</Form.Item>

				<Form.Item
					name="can_reject_task"
					label="Отклонение поручений" // TODO I18
					tooltip="Чьи поручения можно будет отклонять" // TODO I18
					valuePropName="value"
				>
					<Select
						options={reject_task_rights}
					/>
				</Form.Item>

				<Form.Item
					name="can_create_project"
					label="Создание проектов" // TODO I18
					tooltip="Можно ли будет создавать проекты в этой роли" // TODO I18
					valuePropName="checked"
				>
				<Switch
				/>
				</Form.Item>

				<Form.Item
					name="can_edit_other_rights"
					label="Редактирование чужих прав" // TODO I18
					tooltip="Чьи права можно будет редактировать в этой роли" // TODO I18
					valuePropName="value"
				>
					<Select
						options={edit_other_rights}
					/>
			</Form.Item>

				<Form.Item
					name="can_edit_oneself_rights"
					label="Редактирование своих прав" // TODO I18
					tooltip="Можно ли будет редактировать свои права в этой роли" // TODO I18
					valuePropName="checked"
				>
				<Switch
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