import React from 'react';
import {connect} from 'react-redux';
import PubKeyPicker from './FormComponents/PubKeyPicker';
import {
  generateNewKeypair,
  updateFriendbotTarget,
  startFriendbotRequest,
} from '../actions/accountCreator';
import {CodeBlock} from './CodeBlock';

class AccountCreator extends React.Component {
  render() {
    let {state, dispatch} = this.props;
    let keypairTable, keypairGeneratorLink, friendbotResultCodeblock;
    if (state.keypairGeneratorResult !== null) {
      keypairTable = <div className="simpleTable AccountCreator__generator__table">
        <div className="simpleTable__row">
          <div className="simpleTable__row__label">公钥</div>
          <div className="simpleTable__row__content">{state.keypairGeneratorResult.pubKey}</div>
        </div>
        <div className="simpleTable__row">
          <div className="simpleTable__row__label">私钥</div>
          <div className="simpleTable__row__content">{state.keypairGeneratorResult.secretKey}</div>
        </div>
      </div>
    }
    if (state.keypairGeneratorPubKey !== '') {
      keypairGeneratorLink = <a onClick={() => dispatch(updateFriendbotTarget(state.keypairGeneratorPubKey))}>在测试网络下，请使用下面的测试工具。</a>
    }
    if (state.friendbotStatus.code) {
      friendbotResultCodeblock = <CodeBlock className="AccountCreator__spaceTop" code={state.friendbotStatus.code} language="json" />
    }


    let friendbotMessage;
    if (state.friendbotStatus.message) {

      let messageAlertType;
      if (state.friendbotStatus.status === 'loading') {
        messageAlertType = 's-alert--info';
      } else if (state.friendbotStatus.status === 'success') {
        messageAlertType = 's-alert--success';
      } else if (state.friendbotStatus.status === 'failure') {
        messageAlertType = 's-alert--alert';
      }

      friendbotMessage = <div className={`s-alert AccountCreator__friendbot__alert ${messageAlertType}`}>
        {state.friendbotStatus.message}
      </div>
    }

    return <div className="AccountCreator">
      <div className="so-back AccountCreator__section">
        <div className="so-chunk">
          <h3>1. 创建密钥</h3>
          <p>生成一对公钥、私钥。是执行“转账”、“签名”等操作的必要条件</p>

          <button className="s-button" onClick={() => {dispatch(generateNewKeypair())}}>生成密钥</button>
          {keypairTable}
          {keypairGeneratorLink}
        </div>
      </div>
      <div className="so-back AccountCreator__separator">
      </div>
      <div className="so-back AccountCreator__section">
        <div className="so-chunk">
          <h3>2. 激活账户: 激活网络上的测试账户</h3>
          <p>测试机器人基于平行节点，可以在测试环境下为账户发送10,000XNB，同时激活该账户。</p>

          <PubKeyPicker
            className="picker--spaceBottom"
            value={state.friendbotTarget}
            onUpdate={(accountId) => {
              dispatch(updateFriendbotTarget(accountId))
            }} />
          <button className="s-button"
            disabled={state.friendbotTarget.length === 0}
            onClick={() => dispatch(startFriendbotRequest(state.friendbotTarget))}
            >发送XNB</button>
          {friendbotMessage}
          {friendbotResultCodeblock}
        </div>
      </div>
    </div>
  }
}

export default connect(chooseState)(AccountCreator);
function chooseState(state) {
  return {
    state: state.accountCreator,
  }
}
