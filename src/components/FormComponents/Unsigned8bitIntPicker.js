import React from 'react';
import PositiveIntPicker from './PositiveIntPicker';

export default function Unsigned8bitIntPicker(props) {
  return <PositiveIntPicker
    {...props}
    placeholder="0 - 255"
    validator={(value) => {
      if (value >= 255) {
        return '取值范围为0到255之间的整数.';
      }
    }}
  />
}
