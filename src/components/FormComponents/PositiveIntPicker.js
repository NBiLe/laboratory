import React from 'react';
import TextPicker from './TextPicker';

export default function PositiveIntPicker(props) {
  return <TextPicker
    {...props}
    validator={(value) => {
      if (value.charAt(0) === '-') {
        return '需要正数或零';
      } else if (!value.match(/^[0-9]*$/g)) {
        return '应该为整数';
      }

      if (typeof props.validator !== 'undefined') {
        return props.validator(value);
      }
    }}
  />
}
