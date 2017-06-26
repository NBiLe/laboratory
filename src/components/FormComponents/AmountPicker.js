import React from 'react';
import PositiveNumberPicker from './PositiveNumberPicker';

// AmountPicker picks a positive amount. It extends the PositiveNumberPicker and
// adds validation rules IN ADDITION to the ones already present in PositiveNumberPicker.
export default function AmountPicker(props) {
  return <PositiveNumberPicker
    {...props}
    validator={(value) => {
      if (value.charAt(0) === '-') {
        return '金额必须是正数.';
      } else if (!value.match(/^[0-9]*(\.[0-9]+){0,1}$/g)) {
        return '金额只能包含数字和小数点';
      } else if (value.match(/\.([0-9]){8,}$/g)) {
        return '金额精度最多为7位.';
      }
    }}
  />
}
