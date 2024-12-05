import React, { useEffect, useState } from "react";
import { Card, Empty, Spin } from "antd";
import { Hud } from "../components/Hud";
import { api } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { getCookieValue } from "../utils/cookie";
import { TaskCard } from "../components/TaskCard";
import {
    LoadingOutlined
  } from '@ant-design/icons';

export const TasksMy = () => {
    const [roles, setRoles] = useState([{
        label: "Загружаем роли",
        icon: <LoadingOutlined/>,
        disabled: true,
    }]);
    const [selectedRoleId, setselectedRoleId] = useState("r:"+getCookieValue('role_id'));
    const [selectedTab, setSelectedTab] = useState("my-tasks");
    const [tasks, setTasks] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
          icon: null, // Можно добавить иконку, если потребуется
          type: "item",
        }));
        setselectedRoleId(getCookieValue('role_id') || null);
        setRoles(roleItems);
      })
      .catch((error) => {
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
      .then((response) => setAssignments(response.data.result))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [selectedRoleId, selectedTab]);
  useEffect(() => {
        console.log(tasks, assignments);
        
  }, [tasks])

  const onSiderClick = (e) => {
    console.log("sider picked: ", e.key);
    
    const roleId = e.key.replace("r:", "");
    api
      .get(`/role/${roleId}/select`)
      .then(() => {
        console.log("load tasks for role", roleId);
        setselectedRoleId(roleId);
      })
      .catch((error) => {
        console.error("Error selecting role:", error);
        navigate("/internal");
      });
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
            label: "Мои роли",
            children: roles,
            type: "group"
        }
    ]}
      headMenuItems={[
        { key: "my-tasks", label: "Мои задачи" },
        { key: "my-assignments", label: "Мои назначения" },
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
            <Empty/>
         )}
          {selectedTab == "my-assignments" && ( assignments.length > 0 &&
            assignments.map((assignment) => (
                <Card key={assignment.id} title={assignment.name} onClick={(e) => {navigate("/"+assignment.id)}}>
                <p>{assignment.description}</p>
                <p>Создано: {new Date(assignment.created_at).toLocaleString()}</p>
                <p>Изменено: {new Date(assignment.edited_at).toLocaleString()}</p>
                </Card>
            )) ||
            <Empty/>
         )}
        </div>
      )}
    </Hud>
  );
};
