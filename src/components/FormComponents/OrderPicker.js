import React from 'react';
import RadioButtonPicker from './RadioButtonPicker';

export default function OrderPicker(props) {
  let {value, onUpdate} = props;

  return <RadioButtonPicker
    value={value}
    onUpdate={(value) => onUpdate(value)}
    items={{
      'asc': '升序',
      'desc': '降序',
    }}
    />
}