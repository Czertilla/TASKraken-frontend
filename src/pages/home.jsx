import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Row, Col, Typography, Space, Timeline, Divider, Layout, FloatButton, Menu, Flex, Spin } from 'antd';
import Icon, {
  ArrowRightOutlined,
  CheckCircleOutlined,
  GithubOutlined,
  TeamOutlined,
  ProjectOutlined,
  SmileOutlined,
  SafetyCertificateOutlined,
  HomeOutlined,
  LogoutOutlined,
  LoginOutlined,
  AppstoreAddOutlined,
  ApiOutlined
} from '@ant-design/icons';
import '../styles/mainAnimations.css'; // Стили для анимаций
import logoSvg from '../assets/icons/task.svg?react';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../utils/axiosConfig';
import NewOrgSvg from "../assets/icons/neworg.svg?react";
import carousel1 from "../assets/carousel1.webp"
import carousel2 from "../assets/carousel2.webp"
import carousel3 from "../assets/carousel3.webp"
import logo from "../assets/logo.png"

const { Header, Footer } = Layout
const { Title, Paragraph } = Typography;

export const Home = () => {
  const navigate = useNavigate()
  const [isAuth, setAuth] = useState(null)

  useEffect(() => {
    api.get("users/me")
      .then((response) => {
        if (response.status === 200) {
          setAuth(true)
        }
      })
      .catch((error) => {
        setAuth(false)
      })
  }, [])

  const logout = () => {
    setAuth(null)
    api.post("auth/jwt/logout")
      .then((response) => {
        setAuth(false)
      })
      .catch((error) => {
        setAuth(true)
      })
  }

  const onHeaderClick = (e) => {
    if (e.key == "h")
      navigate("/")
    if (e.key == "t")
      navigate("/tasks")
    if (e.key == "np")
      navigate("project/new")
    if (e.key == "ns")
      navigate("struct/regist")
  }

  const carouselContent = [
    {
      title: 'Управляйте задачами эффективно',
      description: 'TASKraken помогает вам оставаться организованным и достигать целей.',
      imgSrc: carousel1,
    },
    {
      title: 'Коллаборация на новом уровне',
      description: 'Объедините усилия вашей команды с лёгкостью.',
      imgSrc: carousel2,
    },
    {
      title: 'Максимальная производительность',
      description: 'Инструменты для продуктивной работы в одном месте.',
      imgSrc: carousel3,
    },
  ];

  const cards = [
    {
      title: 'Гибкость',
      description: 'Адаптируйтесь под свои нужды с настраиваемыми функциями.',
      icon: <ArrowRightOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
    },
    {
      title: 'Безопасность',
      description: 'Мы защищаем ваши данные с использованием современных технологий.',
      icon: <SafetyCertificateOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
    },
    {
      title: 'Поддержка',
      description: 'Наша команда всегда готова помочь вам.',
      icon: <TeamOutlined style={{ fontSize: 24, color: '#faad14' }} />,
    },
    {
      title: 'Интуитивность',
      description: 'Понятный интерфейс, который упрощает использование.',
      icon: <SmileOutlined style={{ fontSize: 24, color: '#f5222d' }} />,
    },
  ];

  const timelineItems = [
    { title: 'Инициализация проекта', description: 'Создайте первый проект за несколько кликов.', icon: <ProjectOutlined /> },
    { title: 'Добавление участников', description: 'Пригласите команду и распределите роли.', icon: <TeamOutlined /> },
    { title: 'Начало работы', description: 'Создавайте задачи и следите за прогрессом.', icon: <CheckCircleOutlined /> },
  ];

  return (
    <div>
      <Header
        style={{
          padding: 0,
          background: "white",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto", // Задаем 3 зоны: кнопка, меню, переключатель темы
          alignItems: "center", // Центрируем элементы по вертикали
        }}
      >
        <Icon component={logoSvg} style={{ fontSize: "40px", marginLeft: "1.2rem" }} onClick={() => navigate("/")} />
        <div
          style={{
            flexGrow: 1, // Занимаем оставшееся пространство
            overflow: "hidden", // Предотвращаем выход за пределы
          }}>

          <Menu
            mode="horizontal"
            defaultSelectedKeys={["h"]}
            onClick={onHeaderClick}
            items={[
              {
                key: "h",
                icon: <HomeOutlined />,
                label: "Главная",
              },
              {
                key: "t",
                icon: <ProjectOutlined />,
                label: "Мои задачи",
                disabled: !isAuth
              },
              {
                key: "np",
                icon: <AppstoreAddOutlined />,
                label: "Новый проект",
                disabled: !isAuth
              },
              {
                key: "ns",
                icon: <Icon component={NewOrgSvg} />,
                label: "Новая организация",
                disabled: !isAuth
              }
            ]}
          />
        </div>

        <Flex style={{ justifySelf: "end", margin: "1.2rem" }}>
          {
            isAuth === null ? (<Spin />) :
              isAuth && <LogoutOutlined onClick={logout} />
              || <LoginOutlined onClick={() => navigate("/auth/jwt/login")} />
          }
        </Flex>
      </Header>
      <div className="homepage-container" style={{
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        padding: '1.2em',
        minHeight: '100vh'
      }}>

        <FloatButton.BackTop />
        {/* Логотип */}
        {/* Заголовок и кнопка для быстрого старта */}
        <section className="hero-section fade-in" style={{
          textAlign: 'center',
          padding: '50px 0',
          color: '#fff',
          animationDelay: '0.3s'
        }}>
          <div className="logo-container mb-6">
            <img
              src={logo}
              alt="TASKraken Logo"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              className="w-96 h-96 rounded-full border-4 border-white"
            />
          </div>
          <Title level={1} className="hero-title" style={{
            color: '#fff',
            fontSize: '3em',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}>Добро пожаловать в TASKraken</Title>
          <Paragraph className="hero-description" style={{
            fontSize: '1.5em',
            marginBottom: '30px'
          }}>
            Ваш инструмент для управления задачами, проектами и командами.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            shape="round"
            className="hero-button"
            style={{
              fontWeight: 'bold',
              padding: '10px 30px'
            }}
            onClick={() => {
              if (isAuth)
                navigate("/struct/regist")
              navigate("/auth/register")
            }}
          >
            Быстрый старт <ArrowRightOutlined />
          </Button>
        </section>

        {/* Слайдер с ключевыми особенностями */}
        <Carousel autoplay arrows effect="fade" className="carousel fade-in mx-0 my-12"
          style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden'
          }}
        >

          {carouselContent.map((item, index) => (
            <div key={index} className="carousel-slide border-r-10">
              <Row align="middle" gutter={24}>
                <Col xs={24} sm={12} className="carousel-text">
                  <Title level={2}>{item.title}</Title>
                  <Paragraph>{item.description}</Paragraph>
                </Col>
                <Col xs={24} sm={12} className='overflow-hidden'>
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="carousel-image"
                    style={{
                      width: '100%'
                    }}
                  />
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>

        {/* Карточки с преимуществами */}
        <section className="features-section fade-in" style={{
          animationDelay: '1s',
          margin: '50px 0'
        }}>
          <Row gutter={[16, 16]} justify="center">
            {cards.map((card, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card hoverable className="feature-card" style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div className="feature-icon mb-2 text-primary">{card.icon}</div>
                  <Title level={4} className="text-xl">{card.title}</Title>
                  <Paragraph className="text-base">{card.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Линия времени */}
        <section className="timeline-section fade-in" style={{
          animationDelay: '1.5s',
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(8px)'
        }}>
          <Title level={2} className="timeline-title">Как начать</Title>

          <Timeline mode="alternate">
            {timelineItems.map((item, index) => (
              <Timeline.Item
                key={index}
                dot={item.icon}
                style={{
                  animationDelay: `${0.2 * index}s`,
                }}
              >
                <Title level={4}>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Timeline.Item>
            ))}
          </Timeline>
        </section>

        {/* Раздел с контактами */}
        <Footer className="contact-section fade-in" style={{
          animationDelay: '2s',
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(230, 247, 255, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)'
        }}>
          <Divider>TASKraken © 2024</Divider>
          <Space direction="vertical" size="large" style={{ textAlign: 'center', width: '100%' }}>
            <Title level={4}>Есть вопросы?</Title>
            <Paragraph>Свяжитесь с нашей поддержкой по адресу: <a href="mailto:czertilla@gmail.com">support@czertilla.ru</a></Paragraph>
            <Space direction='horizontal'>
              <Button className='mb-3'
                type="link"
                href="https://github.com/Czertilla/TASKraken-frontend"
              >
                <Space direction='vertical'>
                  <GithubOutlined style={{ fontSize: "40px" }} />
                  GitHub
                </Space>
              </Button>
              
              <Button className='mb-3'
                type="link"
                href="https://api.taskraken.czertilla.ru/docs"
              >
                <Space direction='vertical'>
                  <ApiOutlined style={{ fontSize: "40px" }} />
                  Api
                </Space>
              </Button>
            </Space>
          </Space>
        </Footer>
      </div>
    </div>

  );
};
