import Card from "antd/es/card/Card";
import { RegisterForm } from "../components/RegisterForm";
import { useParams } from 'react-router-dom';

export const Register = () => {

  const params = useParams();
  
  return (
    <div className="my-auto">
        <Card
            className="mx-auto"
          title={
            <div className="mx-auto">
                <p>Регистрация</p>
            </div>
          }
          style={{
            width: 500,
          }}
          >
            <div className="mx-auto">
                <RegisterForm/>
            </div>
        </Card>
    </div>
  );
};