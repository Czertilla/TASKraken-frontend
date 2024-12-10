import React, { useEffect, useState } from "react";
import { Card, Empty, FloatButton, Image, Spin } from "antd";
import { Hud } from "../components/Hud";
import { api } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { getCookieValue } from "../utils/cookie";
import { TaskCard } from "../components/TaskCard";
import {
	BarsOutlined,
    LoadingOutlined,
    PlusCircleOutlined
  } from '@ant-design/icons';
import { getDefAv, getDefLg } from "../utils/getDefaultAvatar";

const loadingProjItems = (message) => ({
    label: message,
    icon: <LoadingOutlined/>,
    disabled: true,
})

export const TasksMy = () => {
    const [roles, setRoles] = useState([{
        label: "Загружаем роли",
        icon: <LoadingOutlined/>,
        disabled: true,
    }]);
    const [selectedRoleId, setSelectedRoleId] = useState("r:"+getCookieValue('role_id'));
    const [selectedProjId, setSelectedProjId] = useState("p:"+getCookieValue('project_id'));
    const [selectedTab, setSelectedTab] = useState("my-tasks");
    const [tasks, setTasks] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [projects, setProjects] = useState([]);
    const [canCrProj, setCanCrProj] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const catchNetworkErr = (error) => {
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

  // Загружаем роли пользователя
  useEffect(() => {
    api
      .get("role/my-roles")
      .then((response) => {
        // Генерация меню для Sider
        const roleItems = response.data.result.map((role) => ({
          key: `r:${role.id}`,
          label: role.name,
          children: null,
          icon: getDefAv(role.id), // Можно добавить иконку, если потребуется
          type: "item",
        }));
        setSelectedRoleId(getCookieValue('role_id') || null);
        setRoles(roleItems);
      })
      .catch((error) => {
        catchNetworkErr(error)
      });
  }, []);

  useEffect(() => {
    if (!selectedRoleId) return;
    
    setLoading(true); // Start loading
    if (selectedTab == 'my-tasks')
    api
      .get("tasks/my")
      .then((response) => setTasks(response.data.result))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    else
    api
      .get("tasks/my-assignments")
      .then((response) => setAssignments([...response.data.result, ...response.data.result, ...response.data.result, ...response.data.result]))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [selectedRoleId, selectedTab]);

  useEffect(() => {
    setProjects([loadingProjItems("загрузка")])
    api.get(`/role/${selectedRoleId}/rights`)
    .then((response) => setCanCrProj(response.data.can_create_project))
    .catch((error) => console.error(error));
    api.get("/project/my")
    .then((response) => {
        // Генерация меню для Sider
        const roleItems = response.data.result.map((proj) => ({
          key: `p:${proj.id}`,
          label: proj.name,
          children: null,
          icon: getDefLg(proj.id),
          type: "item",
        }));
        setSelectedProjId(getCookieValue('project_id') || null);
        setProjects(roleItems);
    })
    .catch((error) => {
        catchNetworkErr(error)
    });
  }, [selectedRoleId])

  useEffect(() => {
    console.log(tasks, assignments);
  }, [tasks])

  const onSiderClick = (e) => {
    console.log("sider picked: ", e.key);
    if (e.key === "np") navigate("/project/new")
    if (e.key.startsWith("r:")) {
        const roleId = e.key.replace("r:", "");
        api
        .get(`/role/${roleId}/select`)
        .then(() => {
            console.log("load tasks for role", roleId);
            setSelectedRoleId(roleId);
        })
        .catch((error) => {
            catchNetworkErr(error)
        });
    } else if (e.key.startsWith("p:")) {
        const projId = e.key.replace("p:", "");
        api
        .get(`/project/${projId}/select`)
        .then(() => {
            console.log('select project:', projId);
            setSelectedProjId(projId);
        })
    }
  };
  const onHeaderClick = (e) => {
    if (e.key == "my-tasks" || "my-assignments")
        setSelectedTab(e.key)
  }

  return (
    <Hud
      sideMenuItems={[
        {
            key: 'mr',
            label: "Роли",
            children: roles,
            type: "group"
        },
        {
            key: 'mp',
            label: "Проекты",
            children: [{
                    key: "np",
                    icon: <PlusCircleOutlined/>,
                    label: "Новый проект",
                    disabled: !canCrProj
                }, ...projects],
            type: "group"
        }
    ]}
      headMenuItems={[
        { key: "my-tasks", label: "Мои задачи" },
        { key: "my-assignments", label: "Мои поручения" },
      ]}
      dfltSide={selectedRoleId}
      dfltHead="my-tasks"
      onSideClick={onSiderClick}
      onHeadClick={onHeaderClick}
    >   
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-screen justify-start overflow-y-auto p-5">
          {selectedTab == "my-tasks" && (  tasks.length > 0 &&
            tasks.map((task) => (
                <TaskCard data={task}/>
            )) ||
            <Empty description="Нет задач"/>
         )}
          {selectedTab == "my-assignments" && ( assignments.length > 0 &&
            assignments.map((assignment) => (
                <TaskCard data={assignment}/>
            )) ||
            <Empty description="Нет поручений"/>
         )}
        </div>
      )}
			<FloatButton.Group
					trigger="hover"
					type="primary"
					style={{ insetInlineEnd: 94 }}
					icon={<PlusCircleOutlined />}
				>
					<FloatButton />
					<FloatButton icon={<BarsOutlined />} />
					<FloatButton.BackTop/>
				</FloatButton.Group>
    </Hud>
  );
};
