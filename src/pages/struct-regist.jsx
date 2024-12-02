import Card from "antd/es/card/Card";
import { Hud } from "../components/Hud";
import { NewOrgForm } from "../components/NewOrgForm";
import Icon from '@ant-design/icons';
import NewOrgSvg from "../assets/icons/neworg.svg?react";


export const StructRegist = () => {
    return (
      <div>
        <Hud
        headMenuItems={[
          {
            key: 'ns',
            label: 'Новая структура',
            icon: <Icon component={NewOrgSvg}/>
          },
        ]}
        dfltHead='ns'
        >
          <div className="grid grid-cols-1 justify-items-center">
            <Card
              title="Регистрация организации"
              className="shadow-lg w-11/12"
              style={{
                maxWidth: 800
              }}
              >
                <NewOrgForm/>
              </Card>
          </div>
        </Hud>
      </div>
    );
};