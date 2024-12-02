import Card from "antd/es/card/Card";
import { Hud } from "../components/Hud";
import Icon from '@ant-design/icons';
import NewOrgSvg from "../assets/icons/neworg.svg?react";
import { NewPrjForm } from "../components/NewPrjForm";


export const ProjectsNew = () => {
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
        >
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
          </div>
        </Hud>
      </div>
    );
};