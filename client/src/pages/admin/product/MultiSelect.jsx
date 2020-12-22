import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MultiSelect = ({
  items,
  setSelected,
  selectedItems,
  icon,
  placeholder,
}) => {
  function handleChange(value) {
    setSelected(value);
  }
  return (
    <Select
      mode='multiple'
      style={{ width: '100%' }}
      placeholder={placeholder}
      onChange={handleChange}
      optionLabelProp='label'>
      {items.length > 0 &&
        items.map(item => (
          <Option value={item.name} key={item.name} label={item.name}>
            <div className='demo-option-label-item'>
              <span role='img' aria-label='China'>
                {icon}
              </span>
              {item.name}
            </div>
          </Option>
        ))}
    </Select>
  );
};

export default MultiSelect;
