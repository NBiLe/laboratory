import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker';
import PositiveIntPicker from '../FormComponents/PositiveIntPicker';
import TextPicker from '../FormComponents/TextPicker';
import FlagfieldPicker from '../FormComponents/FlagfieldPicker';
import Unsigned8bitIntPicker from '../FormComponents/Unsigned8bitIntPicker';
import HelpMark from '../HelpMark';

const accountFlagFields = {
  1: 'Authorization required',
  2: 'Authorization revocable',
  4: 'Authorization immutable',
};

export default function SetOptions(props) {
  return [
    <OptionsTablePair
      label={<span>增发的目标 <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#inflation-destination" /></span>}
      optional={true} key="inflationDest">
      <PubKeyPicker
        value={props.values['inflationDest']}
        onUpdate={(value) => {props.onUpdate('inflationDest', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>设置标志 <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#flags" /></span>}
      optional={true} key="setFlags">
      <FlagfieldPicker
        value={props.values['setFlags']}
        items={accountFlagFields}
        onUpdate={(value) => {props.onUpdate('setFlags', value)}}
        />
      <p className="optionsTable__pair__content__note">Selected <a href="https://en.wikipedia.org/wiki/Flag_field" target="_blank">flags</a> 已有账户继续添加标志.</p>
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>清除标志 <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#flags" /></span>}
      optional={true} key="clearFlags">
      <FlagfieldPicker
        value={props.values['clearFlags']}
        items={accountFlagFields}
        onUpdate={(value) => {props.onUpdate('clearFlags', value)}}
        />
      <p className="optionsTable__pair__content__note">Selected <a href="https://en.wikipedia.org/wiki/Flag_field" target="_blank">flags</a> 删除帐户中已存在的所选标记.</p>
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>Master 权重 <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#thresholds" /></span>}
      optional={true} key="masterWeight">
      <Unsigned8bitIntPicker
        value={props.values['masterWeight']}
        onUpdate={(value) => {props.onUpdate('masterWeight', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>阈值(低) <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#thresholds" /></span>}
      optional={true} key="lowThreshold">
      <Unsigned8bitIntPicker
        value={props.values['lowThreshold']}
        onUpdate={(value) => {props.onUpdate('lowThreshold', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>阈值(中) <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#thresholds" /></span>}
      optional={true} key="medThreshold">
      <Unsigned8bitIntPicker
        value={props.values['medThreshold']}
        onUpdate={(value) => {props.onUpdate('medThreshold', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>阈值(高)<HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#thresholds" /></span>}
      optional={true} key="highThreshold">
      <Unsigned8bitIntPicker
        value={props.values['highThreshold']}
        onUpdate={(value) => {props.onUpdate('highThreshold', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>签名者的公钥 <HelpMark href="https://www.stellar.org/developers/learn/concepts/multi-sig.html#additional-signing-keys" /></span>}
      optional={true} key="signerPubKey">
      <PubKeyPicker
        value={props.values['signerPubKey']}
        onUpdate={(value) => {props.onUpdate('signerPubKey', value)}}
        />
      <p className="optionsTable__pair__content__note">Used to add/remove or adjust weight of an additional signer on the account.</p>
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>签名者的权重<HelpMark href="https://www.stellar.org/developers/learn/concepts/multi-sig.html#additional-signing-keys" /></span>}
      optional={true} key="signerWeight">
      <Unsigned8bitIntPicker
        value={props.values['signerWeight']}
        onUpdate={(value) => {props.onUpdate('signerWeight', value)}}
        />
      <p className="optionsTable__pair__content__note">Signer will be removed from account if this weight is 0.</p>
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>Home 域 <HelpMark href="https://www.stellar.org/developers/learn/concepts/multi-sig.html#additional-signing-keys" /></span>}
      optional={true} key="homeDomain">
      <TextPicker
        value={props.values['homeDomain']}
        placeholder="Example: example.com"
        onUpdate={(value) => {props.onUpdate('homeDomain', value)}}
        />
    </OptionsTablePair>,
  ];
}
