import Card from "antd/es/card/Card";
import { Hud } from "../components/Hud";
import Icon, { LoadingOutlined } from '@ant-design/icons';
import NewOrgSvg from "../assets/icons/neworg.svg?react";
import { NewPrjForm } from "../components/NewPrjForm";
import { getRoleItems } from "../components/RoleMenu";
import { getCookieValue } from "../utils/cookie";
import { useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosConfig";
import { Forbidden } from "../components/Result";
import { Spin } from "antd";


export const ProjectsNew = () => {
    const [roles, setRoles] = useState([{
      label: "Загружаем роли",
      icon: <LoadingOutlined/>,
      disabled: true,
    }]);
    const [selectedRoleId, setselectedRoleId] = useState("r:"+getCookieValue('role_id'));
    const [loading, setLoading] = useState(true);
    const [forbidden, setForbidden] = useState(false);
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
        api.get(`role/${selectedRoleId}/rights`)
        .then((response) => setForbidden(!response.data.can_create_project))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, [selectedRoleId]);

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
    

    return (
      <div>
        <Hud
        headMenuItems={[
          {
            key: 'np',
            label: 'Новый проект',
            icon: <Icon component={NewOrgSvg}/>
          },
        ]}
        sideMenuItems={[
          {
              key: 'mr',
              label: "Мои роли",
              children: roles,
              type: "group"
          }
        ]}
        dfltSide={selectedRoleId}
        dfltHead='np'
        onSideClick={onSiderClick}
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) :forbidden ? (<Forbidden/>) :(
            <div className="grid grid-cols-1 justify-items-center">
              <Card
                title="Создание проекта"
                className="shadow-lg w-11/12"
                style={{
                  maxWidth: 450
                }}
                >
                  <NewPrjForm/>
                </Card>
            </div>
          )}
        </Hud>
      </div>
    );
};