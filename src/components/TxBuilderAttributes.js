import React from 'react';
import OptionsTablePair from './OptionsTable/Pair';
import HelpMark from './HelpMark';
import PubKeyPicker from './FormComponents/PubKeyPicker';
import SequencePicker from './FormComponents/SequencePicker';
import StroopsPicker from './FormComponents/StroopsPicker';
import MemoPicker from './FormComponents/MemoPicker';
import TimeBoundsPicker from './FormComponents/TimeBoundsPicker';
import {connect} from 'react-redux';
import {Keypair} from 'stellar-sdk';
import NETWORK from '../constants/network';
import {fetchSequence} from '../actions/transactionBuilder';

export default function TxBuilderAttributes(props) {
  let {onUpdate, attributes} = props;

  return <div className="TransactionAttributes">
    <div className="TransactionOp__config TransactionOpConfig optionsTable">
      <OptionsTablePair label={<span>源账户 <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html" /></span>}>
        <PubKeyPicker
          value={attributes['sourceAccount']}
          onUpdate={(value) => {onUpdate('sourceAccount', value)}}
          />
        <p className="optionsTable__pair__content__note">如果你还没有账户，你可以<a href="#account-creator">创建一个账户</a>.</p>
      </OptionsTablePair>
      <OptionsTablePair label={<span>业务序列号<HelpMark href="https://www.stellar.org/developers/learn/concepts/transactions.html#sequence-number" /></span>}>
        <SequencePicker
          value={attributes['sequence']}
          onUpdate={(value) => {onUpdate('sequence', value)}}
          />
        <p className="optionsTable__pair__content__note">事务序列号通常会不断增加，需要及时更新</p>
        <SequenceFetcher />
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>基本交易费<HelpMark href="https://www.stellar.org/developers/learn/concepts/transactions.html#memo" /></span>}>
        <StroopsPicker
          value={attributes['fee']}
          onUpdate={(value) => {onUpdate('fee', value)}}
          />
        <p className="optionsTable__pair__content__note">所有业务都会产生<a href="https://www.stellar.org/developers/learn/concepts/fees.html">基本业务手续费</a> 大概为 100 Lee (0.00001 XNB). 同时，你可以增加业务手续费，手续费的多少决定了该笔业务被处理的速度。</p>
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>备注 <HelpMark href="https://www.stellar.org/developers/learn/concepts/transactions.html#memo" /></span>}>
        <MemoPicker
          value={{
            type: attributes.memoType,
            content: attributes.memoContent,
          }}
          onUpdate={(value) => {onUpdate('memo', value)}}
          />
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>时间区间 <HelpMark href="https://www.stellar.org/developers/guides/concepts/transactions.html#time-bounds" /></span>}>
        <TimeBoundsPicker
          value={{
            minTime: attributes.minTime,
            maxTime: attributes.maxTime
          }}
          onUpdate={(value) => {onUpdate('timebounds', value)}}
          />
        <p className="optionsTable__pair__content__note">需要输入有效的执行时间段.</p>
      </OptionsTablePair>
    </div>
  </div>
}

class sequenceFetcherClass extends React.Component {
  render() {
    let {attributes, sequenceFetcherError} = this.props.state;
    let dispatch = this.props.dispatch;
    let currentNetwork = this.props.currentNetwork;
    if (!Keypair.isValidPublicKey(attributes.sourceAccount)) {
      return null;
    }

    let sequenceErrorMessage;
    if (sequenceFetcherError.length > 0) {
      sequenceErrorMessage = <span className="optionsTable__pair__content__note optionsTable__pair__content__note--alert">
        {sequenceFetcherError}
      </span>
    }

    let truncatedAccountId = attributes.sourceAccount.substr(0,10);

    return <p className="optionsTable__pair__content__note">
      <a
        className="s-button"
        onClick={() => dispatch(
          fetchSequence(attributes.sourceAccount, NETWORK.available[currentNetwork].url)
        )}
        >刷新序列号，账户："{truncatedAccountId}"</a>
      <br />
      {sequenceErrorMessage}
    </p>
  }
}

let SequenceFetcher = connect(chooseState)(sequenceFetcherClass);
function chooseState(state) {
  return {
    state: state.transactionBuilder,
    currentNetwork: state.network.current,
  }
}
