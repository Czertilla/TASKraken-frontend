import Card from "antd/es/card/Card";
import { Hud } from "../components/Hud";
import { NewOrgForm } from "../components/NewOrgForm";


export const StructRegist = () => {
    return (
      <div>
        <Hud
        content={
          <div className="grid grid-cols-1 justify-items-center">
            <Card
              className="shadow-lg w-11/12"
              style={{
                maxWidth: 800
              }}
              >
                <NewOrgForm/>
              </Card>
          </div>
        }
        />
      </div>
    );
};