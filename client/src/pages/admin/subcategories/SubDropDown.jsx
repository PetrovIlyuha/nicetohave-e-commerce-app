import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function SubDropDown({ items, selectItem }) {
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
      <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
        Select Sub-Category <DownOutlined />
      </a>
    </Dropdown>
  );
}

export default SubDropDown;
