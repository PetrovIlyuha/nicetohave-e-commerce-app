import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MultiSelect = ({ items, setSelected, selectedItems }) => {
  function handleChange(value) {
    setSelected(value);
  }
  return (
    <Select
      mode='multiple'
      style={{ width: '100%' }}
      placeholder='Select subcategory'
      onChange={handleChange}
      optionLabelProp='label'>
      {items.length > 0 &&
        items.map(item => (
          <Option value={item.name} label={item.name}>
            <div className='demo-option-label-item'>
              <span role='img' aria-label='China'>
                📦
              </span>
              {item.name}
            </div>
          </Option>
        ))}
    </Select>
  );
};

export default MultiSelect;
