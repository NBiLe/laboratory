import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import SelectPicker from './FormComponents/SelectPicker';
import extrapolateFromXdr from '../utilities/extrapolateFromXdr';
import TreeView from './TreeView';
import validateBase64 from '../utilities/validateBase64';
import {updateXdrInput, updateXdrType, fetchLatestTx} from '../actions/xdrViewer';
import NETWORK from '../constants/network';
import {xdr} from 'stellar-sdk';

function XdrViewer(props) {
  let {dispatch, state, baseURL} = props;

  let validation = validateBase64(state.input);
  let messageClass = validation.result === 'error' ? 'xdrInput__message__alert' : 'xdrInput__message__success';
  let message = <p className={messageClass}>{validation.message}</p>

  let xdrTypeIsValid = _.indexOf(xdrTypes, state.type) >= 0;
  let treeView, errorMessage;
  if (state.input === '') {
    errorMessage = <p>输入base-64的XDR值</p>;
  } else if (!xdrTypeIsValid) {
    errorMessage = <p>选择XDR类型</p>;
  } else {
    try {
      treeView = <TreeView nodes={extrapolateFromXdr(state.input, state.type)} />
    } catch (e) {
      console.error(e)
      errorMessage = <p>无法将输入解码为 {state.type} 格式</p>;
    }
  }

  return <div>
    <div className="XdrViewer__setup so-back">
      <div className="so-chunk">
        <div className="pageIntro">
          <p><a href="https://www.stellar.org/developers/horizon/learn/xdr.html">(XDR)</a> 是对数据进行编码的标准化协议.</p>
          <p>XDR处理器把XDR内容解析为可读的数据格式。</p>
        </div>
        <p className="XdrViewer__label">
          输入base-64编码的XDR blob <a onClick={() => dispatch(fetchLatestTx(baseURL))}> </a>:
        </p>
        <div className="xdrInput__input">
          <textarea
            value={state.input}
            className="xdrInput__input__textarea"
            onChange={(event) => dispatch(updateXdrInput(event.target.value))}
            placeholder="例如: AAAAAGXNhB2hIkbP//jgzn4os/AAAAZAB+BaLPAAA5Q/xL..."></textarea>
        </div>
        <div className="xdrInput__message">
          {message}
        </div>

        <p className="XdrViewer__label">XDR 类型:</p>
        <SelectPicker
          value={state.type}
          placeholder="Select XDR type"
          onUpdate={(input) => dispatch(updateXdrType(input))}
          items={xdrTypes}
        />
      </div>
    </div>
    <div className="XdrViewer__results so-back">
      <div className="so-chunk">
        {errorMessage}
        {treeView}
      </div>
    </div>
  </div>
}

export default connect(chooseState)(XdrViewer);
function chooseState(state) {
  return {
    state: state.xdrViewer,
    baseURL: NETWORK.available[state.network.current].url,
  }
}

// Array of all the xdr types. Then, the most common ones appear at the top
// again for convenience
let xdrTypes = _(xdr).functions().sort().value();
xdrTypes = ['TransactionEnvelope', 'TransactionResult', 'TransactionMeta', '---'].concat(xdrTypes)
