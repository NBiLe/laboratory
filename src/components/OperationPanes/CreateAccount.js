import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';
import AmountPicker from '../FormComponents/AmountPicker.js';

export default function CreateAccount(props) {
  return [
    <OptionsTablePair label="目标" key="destination">
      <PubKeyPicker
        value={props.values['destination']}
        onUpdate={(value) => {props.onUpdate('destination', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="起始余额" key="startingBalance">
      <AmountPicker
        value={props.values['startingBalance']}
        onUpdate={(value) => {props.onUpdate('startingBalance', value)}}
        />
    </OptionsTablePair>,
  ];
}
