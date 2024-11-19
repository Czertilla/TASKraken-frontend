import Card from "antd/es/card/Card";

export function RoleCard(props) {

    const { data } = props


    return (
      <div>
        <Card
          title={
            <div className="flex items-center gap-3">
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"/>
              <span>{data.name}</span>
            </div>
          }
          style={{
            width: 300,
          }}
          >
          <p>id: {data.id}</p>
          <p>организация: {data.organization_name}</p>
          <p>уровень: {data.level}</p>
        </Card>
      </div>
    )
  }
  