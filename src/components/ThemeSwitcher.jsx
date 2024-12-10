import { Switch } from "antd"
import { getItem } from "../utils/localStorage";
import { useEffect, useState } from "preact/hooks";
import {
  MoonOutlined,
	SunOutlined
} from '@ant-design/icons';


export const ThemeSwithcer = () => {
  const [theme, setTheme] = useState(getItem("theme", "light"));
	const changeTheme = (value) => {
    	setTheme(value ? 'dark' : 'light');
  };
	useEffect(() => {
			localStorage.setItem("theme", theme)
	}, [theme])

		return (<Switch
			checked={theme === 'dark'}
			onChange={changeTheme}
			checkedChildren={<MoonOutlined />}
			unCheckedChildren={<SunOutlined />}
		/>)
}