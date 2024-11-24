import React, { useEffect } from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import { useState } from 'preact/hooks';
import { RoleCard } from '../components/RoleCard';
import { RoleMenu } from '../components/RoleMenu';
import { api } from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type){
  return {
    key,
    icon,
    children,
    label,
    type
  }
}

export const Roles = () => {
  const [roles, setRoles] = useState([])
  const [roleId, setRoleId] = useState(null)
  const [roleCardData, setRoleData] = useState(null)
  const [authorized, setAthorized] = useState(true)
  const navigate = useNavigate()

  const fetchRoles = () => {
    api.get("/role/my-roles")
    .then(r => {
      const searchRolesResponse = r.data.result
      const menuItems = [
        getItem("Список ролей", "g1", null, 
          searchRolesResponse.map(r => {
            return {label: r.name, key: r.id}
          }),
          'group'
        )
      ]
      setRoles(menuItems)
    })
    .catch((error) => {
      console.log("err", error);
      if (error.response.status == 401 && error.response.data.detail === "Unauthorized"){
        setAthorized(false)
      }
      
    })
  }

  const fetchRole = () => {
    axios.get(
      "http://127.0.0.1:8000/role/search",
      {params: {id__in: roleId}}
    ).then(r => {
      console.log("response", r.data.result)
      setRoleData(r.data.result[0])
    })
    console.log("role.data", roleCardData)
  }

  useEffect(() => {
    fetchRoles()
  }, [])
  useEffect(() => {
    setRoleData(null)
    fetchRole()
  }, [roleId])
  useEffect(() => {
    if (!authorized) navigate("/auth/jwt/login")
  }, [authorized])


  const onClick = (e) => {
    setRoleId(e.key)
  };

  return (
    <div className='flex'>
      <RoleMenu 
        items ={roles}
        hook ={onClick}
      />
      <div className='mx-auto my-auto'>
        {roleCardData ? <RoleCard data={roleCardData}/> : <Spin size='large'/>}
      </div>
    </div>
  );
};