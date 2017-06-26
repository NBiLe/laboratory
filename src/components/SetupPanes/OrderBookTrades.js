import React from 'react';
import _ from 'lodash';
import OptionsTablePair from '../OptionsTable/Pair';
import AssetPicker from '../FormComponents/AssetPicker.js';
import TextPicker from '../FormComponents/TextPicker.js';
import PositiveIntPicker from '../FormComponents/PositiveIntPicker.js';
import OrderPicker from '../FormComponents/OrderPicker.js';

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

    <OptionsTablePair label="起始位置(Cursor)" optional={true}>
      <TextPicker
        value={props.values['cursor']}
        onUpdate={(value) => {props.onUpdate('cursor', value)}}
        />
    </OptionsTablePair>
    <OptionsTablePair label="单页显示数量(Limit)">
      <PositiveIntPicker
      value={props.values['limit']}
        onUpdate={(value) => {props.onUpdate('limit', value)}}
        />
    </OptionsTablePair>
    <OptionsTablePair label="命令(Order)">
      <OrderPicker
        value={props.values['order']}
        onUpdate={(value) => {props.onUpdate('order', value)}}
        />
    </OptionsTablePair>
  </div>
}
