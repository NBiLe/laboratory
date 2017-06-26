import React from 'react';
import PositiveIntPicker from './PositiveIntPicker';

export default function SequencePicker(props) {
  let {value, onUpdate} = props;

  return <PositiveIntPicker
    value={value}
    placeholder='默认手续费为100Lee(1 XNB = 10,000,000 Lee)'
    onUpdate={(value) => onUpdate(value)}
    />
}
