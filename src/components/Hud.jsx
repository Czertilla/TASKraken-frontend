import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Flex, Layout, Menu, theme } from 'antd';
import { getItem } from '../utils/localStorage';
import { ThemeSwithcer } from './ThemeSwitcher';
import { useSwipeable } from 'react-swipeable';
import Icon from '@ant-design/icons';
import "../styles/siderOverflow.css";
import "../styles/scrollContainer.css";

import logoSvg from '../assets/icons/task.svg?react';
import { api } from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const getSiderStyle = (coolapserAble) =>{
  return {
    padding: 0,
    height: "100vh",
    position: coolapserAble ? "sticky" : "fixed",
    zIndex: 999,
    top: 0,
    left: 0,
  };
}

export const Hud = (props) => {
  const { children , sideMenuItems, headMenuItems, dfltSide, dfltHead, onSideClick, onHeadClick } = props
  const [themeKey, setTheme] = useState(getItem("theme", "white"))
  const [collapsed, setCollapsed] = useState(false);
  const [collapserAble, setCollapserAble] = useState(true);
  const [buttonsColor, setBottonsColor] = useState("black")
  const themeSwitcher = ThemeSwithcer()
  const navigate = useNavigate()
  const {
      token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const swipeHandler = useSwipeable({
      onSwipedLeft: () => setCollapsed(true),
      onSwipedRight: () => setCollapsed(false)
  });

  const catchErr = (error) => {
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
  }

  const onSiderClick = (e) => {
      if (e.key == 'h'){
        navigate('/home')
        return
      } 
      if (onSideClick) onSideClick(e)
  }
  const onHeaderClick = (e) => {
    if (e.key == 'h'){
      navigate('/home')
      return
    } 
    if (onHeadClick) onHeadClick(e)
}
  const onClick = (e) => {
      if (!collapserAble && !collapsed) {
        setCollapsed(true);
        e.stopPropagation();
      }
  }
  useEffect(() => {
      setTheme(getItem("theme", "white"))
  }, [themeSwitcher])
  useEffect(() => {
      setBottonsColor(themeKey === "dark" ? "white" : "black")
  }, [themeKey])

  return (
    <Layout className='relative'>
      <Sider 
        {...swipeHandler}
        trigger={null} 
        theme={themeKey}
        collapsible 
        style={getSiderStyle(collapserAble)}
        collapsed={collapsed}
        breakpoint="sm"
        onBreakpoint={(broken) => {
          setCollapserAble(!broken)
          setCollapsed(broken)
        }}
      >
        <Menu
          className='my-2'
          theme={themeKey}
          mode="inline"
          defaultSelectedKeys={[dfltSide || "h"]}
          onClick={onSiderClick}
          items={[
            {
              key: 'h',
              icon: <Icon component={logoSvg} style={{fontSize: "40px", marginLeft: "-13px"}}/>,
              label: "TASKraken",
            },
            ...sideMenuItems || []
          ]}
        />
      </Sider>
      <Layout
      onClick={onClick}
      className= {!collapserAble ?( !collapsed ? "hide-enter" : "hide-outer") : ""}
      style={{
        overflow: "visible",
        marginLeft: collapserAble ? 0 : 72,
        minHeight: "100vh",
      }}
      >
        <Header
          style={{
            padding: 0,
            background: themeKey === "light" ? colorBgContainer : null,
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto", // Задаем 3 зоны: кнопка, меню, переключатель темы
            alignItems: "center", // Центрируем элементы по вертикали
          }}
        >
          {collapserAble ? (
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ color: buttonsColor }} />
                ) : (
                  <MenuFoldOutlined style={{ color: buttonsColor }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          ) : <div/>}
          <Menu
            theme={themeKey}
            mode="horizontal"
            defaultSelectedKeys={[dfltHead || "h"]}
            onClick={onHeaderClick}
            items={[
              {
                key: "h",
                icon: <HomeOutlined />,
                label: "home",
              },
              ...(headMenuItems || []),
            ]}
            />

          <Flex style={{ justifySelf: "end", marginRight: "8px" }}>{themeSwitcher}</Flex>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};