import { Menu } from 'antd';

export function RoleMenu (props) {

  const {items, hook} = props

  return (
    <div className='flex'>
      <Menu
        className='h-screen overflow-scroll'
        onClick={hook}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  );
};