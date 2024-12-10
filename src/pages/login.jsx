import Card from "antd/es/card/Card";
import { LoginForm } from "../components/LoginForm";
import { useParams } from 'react-router-dom';

export const LoginPage = () => {

  const params = useParams();
  
  return (
    <div>
        <div className="grid grid-cols-1 justify-items-center mt-20 md:mt-40">
          <Card
            className="shadow-lg w-11/12"
            style={{
              maxWidth: 500
            }}
            title={
              <div>
                  <p>Вход</p>
              </div>
            }
            extra={
              <a href="/auth/register"> 
                Регистрация
              </a>
            }
            >
              <LoginForm/>
          </Card>
        </div>
    </div>
  );
};