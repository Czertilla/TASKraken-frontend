import Card from "antd/es/card/Card";
import { RegisterForm } from "../components/RegisterForm";
import { useParams } from 'react-router-dom';

export const Register = () => {

  const params = useParams();
  
  return (
    <div>
        <div className="grid grid-cols-1 justify-items-center">
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
            >
              <RegisterForm/>
          </Card>
        </div>
    </div>
  );
};