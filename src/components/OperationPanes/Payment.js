import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';
import AmountPicker from '../FormComponents/AmountPicker.js';
import AssetPicker from '../FormComponents/AssetPicker.js';

export default function Payment(props) {
  return [
    <OptionsTablePair label="目标" key="destination">
      <PubKeyPicker
        value={props.values['destination']}
        onUpdate={(value) => {props.onUpdate('destination', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="资产" key="asset">
      <AssetPicker
        value={props.values['asset']}
        onUpdate={(value) => {props.onUpdate('asset', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="数量" key="amount">
      <AmountPicker
        value={props.values['amount']}
        onUpdate={(value) => {props.onUpdate('amount', value)}}
        />
    </OptionsTablePair>,
  ];
}
