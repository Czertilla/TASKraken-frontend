import Card from "antd/es/card/Card";
import { RegisterForm } from "../components/RegisterForm";
import { useParams } from 'react-router-dom';

export const Register = () => {

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
                  <p>Регистрация</p>
              </div>
            }
            extra={
              <a href="/auth/jwt/login">
                Вход
              </a>
            }
            >
              <RegisterForm/>
          </Card>
        </div>
    </div>
  );
};