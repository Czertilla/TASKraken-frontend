import { api } from '../utils/axiosConfig';import {
  UserOutlined
} from '@ant-design/icons';

function getItem(label, key, icon, children, type){
  return {
    key,
    icon,
    children,
    label,
    type
  }
}

export function getRoleItems () {

  console.log("gettings roles...")
  return api.get("/role/my-roles")
  .then(r => {
    const searchRolesResponse = r.data.result
    return Promise.resolve([
      getItem("Ваши роли", "g1", null, 
        searchRolesResponse.map(r => {
          return {label: r.name, key: `r:${r.id}`, icon: <UserOutlined />}
        }),
        'group'
      )
    ])
  })
  .catch((error) => {
    console.log("while getting roles:", error);
    if (error.response) {
        if (error.response.status === 500) {
            console.error('Internal Server Error:', error.response.data)
            return Promise.reject(new Error('/internal'))
        }
    console.error('Error:', error.response?.data || error.message);
    if (error.response.status == 401 && error.response.data.detail === "Unauthorized"){
        return Promise.reject(new Error("/auth/jwt/login"))
    }
    }
    else
        return Promise.reject(new Error('/internal'))
  })


};