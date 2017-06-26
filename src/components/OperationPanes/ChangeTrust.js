import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import AssetPicker from '../FormComponents/AssetPicker.js';
import PositiveIntPicker from '../FormComponents/PositiveIntPicker.js';

export default function ChangeTrust(props) {
  return [
    <OptionsTablePair label="资产" key="asset">
      <AssetPicker
        value={props.values['asset']}
        disableNative={true}
        onUpdate={(value) => {props.onUpdate('asset', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="信任限制" optional="true" key="limit">
      <PositiveIntPicker
        value={props.values['limit']}
        onUpdate={(value) => {props.onUpdate('limit', value)}}
        />
      <p className="optionsTable__pair__content__note">
        留空为默认值max int64。
        <br />
        如果设置0，则删除信任关系
      </p>
    </OptionsTablePair>,
  ];
}
