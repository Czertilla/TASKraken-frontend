import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  LogoutOutlined,
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

const getSiderStyle = (coolapserAble) => {
  return {
    padding: 0,
    height: "100vh",
    position: coolapserAble ? "sticky" : "fixed",
    overflow: "scroll",
    scrollbarWidth: "none", // Скрывает скроллбар в Firefox
    msOverflowStyle: "none", // Скрывает скроллбар в IE и Edge
    zIndex: 999,
    top: 0,
    left: 0,
  };
}

export const Hud = (props) => {
  const { children, sideMenuItems, headMenuItems, dfltSide, dfltHead, onSideClick, onHeadClick } = props
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

  const logout = () => {
    api.post("/auth/jwt/logout").then(() => navigate("/"))
  }

  const onSiderClick = (e) => {
    if (e.key == 'h') {
      navigate('/')
      return
    }
    if (onSideClick) onSideClick(e)
  }
  const onHeaderClick = (e) => {
    if (e.key == 'h') {
      navigate('/')
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
              icon: <Icon component={logoSvg} style={{ fontSize: "40px", marginLeft: "-13px" }} />,
              label: "TASKraken",
            },
            ...sideMenuItems || []
          ]}
        />
      </Sider>
      <Layout
        onClick={onClick}
        className={!collapserAble ? (!collapsed ? "hide-enter" : "hide-outer") : ""}
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
          ) : <div />}
          <div
            style={{
              flexGrow: 1, // Занимаем оставшееся пространство
              overflow: "hidden", // Предотвращаем выход за пределы
            }}>
            <Menu
              theme={themeKey}
              mode="horizontal"
              defaultSelectedKeys={[dfltHead || "h"]}
              onClick={onHeaderClick}
              items={[
                {
                  key: "h",
                  icon: <HomeOutlined />,
                  label: "Главная",
                },
                ...(headMenuItems || []),
              ]}
            />
          </div>


          <Flex className="space-x-4" style={{ justifySelf: "end", marginRight: "1.2rem", alignItems: "stretch" }}>
            {themeSwitcher}
            <LogoutOutlined onClick={logout} />
          </Flex>
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