import React from 'react';
import PositiveIntPicker from './PositiveIntPicker';

export default function OperationPicker(props) {
  let {value, onUpdate} = props;

  return <PositiveIntPicker
    value={value}
    placeholder="例如: 55834578945"
    onUpdate={(value) => onUpdate(value)}
    />
}
