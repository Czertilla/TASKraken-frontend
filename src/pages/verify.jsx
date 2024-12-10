import Card from "antd/es/card/Card";
import { Verify } from "../components/Verify";
import { useParams } from 'react-router-dom';

export const VerifyPage = () => {

  const params = useParams();
  
  return (
    <div>
        <div className="grid grid-cols-1 justify-items-center">
          <Verify/>
        </div>
    </div>
  );
};