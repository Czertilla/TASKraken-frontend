import React, { useEffect, useState, useRef } from 'react';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Flex, Layout, Menu, Tabs, theme } from 'antd';
import { getItem } from '../utils/localStorage';
import { ThemeSwithcer } from './ThemeSwitcher';
import { useSwipeable } from 'react-swipeable';
import Icon from '@ant-design/icons';
import "../styles/siderOverflow.css";
import "../styles/scrollContainer.css";

import logoSvg from '../assets/icons/task.svg?react';
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
  const { content, sideMenuItems, headMenuItems, dfltSide, dfltHead } = props
  const [themeKey, setTheme] = useState(getItem("theme", "white"))
  const [collapsed, setCollapsed] = useState(false);
  const [collapserAble, setCollapserAble] = useState(true);
  const [buttonsColor, setBottonsColor] = useState("black")
  const themeSwitcher = ThemeSwithcer()
  const {
      token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const swipeHandler = useSwipeable({
      onSwipedLeft: () => setCollapsed(true),
      onSwipedRight: () => setCollapsed(false)
  });
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
          {content ? content : "content"}
        </Content>
      </Layout>
    </Layout>
  );
};