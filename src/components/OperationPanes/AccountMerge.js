import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';

export default function AccountMerge(props) {
  return [
    <OptionsTablePair label="目标账户" key="destination">
      <PubKeyPicker
        value={props.values['destination']}
        onUpdate={(value) => {props.onUpdate('destination', value)}}
        />
    </OptionsTablePair>,
  ];
}
