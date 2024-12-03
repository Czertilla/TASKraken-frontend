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


export const ProjectsNew = () => {
    const [sideItems, setSideItems] = useState()
    const [currRole, setCurrRole] = useState(getCookieValue("role_id"))
    const [forbidden, setForbidden] = useState(false)
    const navigate = useNavigate()
    
    
    useEffect(() => {
        api.get(`role/${currRole}/rights`)
        .then((response) => {
            console.log("check", response.data.can_create_project);
            
            setForbidden(!response.data.can_create_project)
        })
    }, [currRole])
    useEffect(() => {
        console.log("get roles items: ");
        getRoleItems()
        .then((result) => {
            console.log(result)
            setSideItems(result)
            setCurrRole(getCookieValue("role_id"))
        })
        .catch((error) => {
            navigate(error.message)
        })
    }, [])
    useEffect(() => {
        console.log("roles items: ", sideItems);
        
        if (sideItems === "/internal")
            navigate(sideItems)
        if (sideItems === "Unauthorized")
            navigate("/auth/jwt/login")
    }, sideItems)

    return (
      <div>
        <Hud
        headMenuItems={[
          {
            key: 'ns',
            label: 'Новый проект',
            icon: <Icon component={NewOrgSvg}/>
          },
        ]}
        dfltHead='ns'
        sideMenuItems={sideItems || [
            {
                key: '',
                label: 'загрузка ролей',
                disabled: true,
                icon: <LoadingOutlined />
            }
        ]}
        dfltSide={`r:${currRole}`}
        >
          {forbidden ? <Forbidden/> :
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
          </div>}
        </Hud>
      </div>
    );
};