import React from 'react';
import _ from 'lodash';
import OptionsTablePair from '../OptionsTable/Pair';
import AssetPicker from '../FormComponents/AssetPicker.js';

export default function Trades(props) {
  return <div>
    <OptionsTablePair label="卖出资产">
      <AssetPicker
      value={props.values['selling_asset']}
      onUpdate={(value) => {props.onUpdate('selling_asset', value)}}
      />
    </OptionsTablePair>
    <OptionsTablePair label="购买资产">
      <AssetPicker
      value={props.values['buying_asset']}
      onUpdate={(value) => {props.onUpdate('buying_asset', value)}}
      />
    </OptionsTablePair>
  </div>
}
