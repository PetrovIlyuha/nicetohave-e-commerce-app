import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function SubDropDown({ label, items, selectItem }) {
  const onClick = ({ item }) => {
    selectItem(item.props.children[1]);
  };

  const menu = (
    <Menu onClick={onClick}>
      {items.map((item, idx) => (
        <Menu.Item key={idx}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <span className='ant-dropdown-link' onClick={e => e.preventDefault()}>
        {label}
        <DownOutlined />
      </span>
    </Dropdown>
  );
}

export default SubDropDown;
