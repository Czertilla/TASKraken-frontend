import React, { useEffect, useState } from 'react';
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
const { Header, Sider, Content } = Layout;

const getSiderStyle = (coolapserAble) =>{
  return {
    padding: 0,
    height: "100vh",
    position: coolapserAble ? "sticky" : "absolute",
    zIndex: 999,
    top: 0,
    left: 0,
  };
}


export const Hud = (props) => {
  const { content } = props
  const [themeKey, setTheme] = useState(getItem("theme", "white"))
  const [collapsed, setCollapsed] = useState(true);
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
          defaultSelectedKeys={['0']}
          items={[
            {
              key: '0',
              icon: <HomeOutlined />,
              label: "home"
            },
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout
      onClick={onClick}
      className= {!collapserAble && !collapsed ? "blur brightness-50" : ""}
      style={{
        overflow: "hidden",
        marginLeft: collapserAble ? 0 : 72,
        minHeight: "100vh"
      }}
      >
        <Header
          className='justify-between w-11/12'
          style={{
            padding: 0,
            background: themeKey === "light" ? colorBgContainer: null,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {collapserAble ? <Button
            className='flex my-auto'
            type="text"
            disabled={!collapserAble}
            icon={
                collapsed 
                ? <MenuUnfoldOutlined style={{color: buttonsColor}}/> 
                : <MenuFoldOutlined style={{color: buttonsColor}}/>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          /> : null}
          <Flex
            // className="overflow-x-scroll"
            style={{
              overflowX: "scroll",
              scrollbarGutter: "stable",
              scrollbarWidth: "none"
            }}
          >
            <Menu
            theme={themeKey}
            mode="horizontal"
            defaultSelectedKeys={['0']}
            items={[
                {
                  key: '0',
                  icon: <HomeOutlined />,
                  label: "home"
                },
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'nav 1',
                },
                {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: 'nav 2',
                },
                {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: 'nav 3',
                },
              ]}
            />
          </Flex>
          
          
            {themeSwitcher}
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