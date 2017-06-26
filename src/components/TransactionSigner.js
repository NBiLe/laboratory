import React from 'react';
import {connect} from 'react-redux';
import {Transaction, Keypair, Network} from 'stellar-sdk';
import TransactionImporter from './TransactionImporter';
import {
  importFromXdr,
  clearTransaction,
  setSecrets,
} from '../actions/transactionSigner';
import {EasySelect} from './EasySelect';
import OptionsTablePair from './OptionsTable/Pair';
import SecretKeyPicker from './FormComponents/SecretKeyPicker';
import MultiPicker from './FormComponents/MultiPicker';
import {txPostLink, xdrViewer} from '../utilities/linkBuilder';
import HelpMark from './HelpMark';
import clickToSelect from '../utilities/clickToSelect';
import scrollOnAnchorOpen from '../utilities/scrollOnAnchorOpen';
import extrapolateFromXdr from '../utilities/extrapolateFromXdr';
import validateTxXdr from '../utilities/validateTxXdr';
import TreeView from './TreeView';
import NETWORK from '../constants/network';
import {signTransaction} from '../utilities/Libify';

class TransactionSigner extends React.Component {
  render() {
    let {dispatch, networkObj} = this.props;
    let {xdr, signers} = this.props.state;
    let content;

    if (validateTxXdr(xdr).result !== 'success') {
      content = <div className="so-back">
        <div className="so-chunk">
          <div className="TxSignerImport TransactionSigner__import">
            <p className="TxSignerImport__title">输入 XDR 格式的数据:</p>
            <TransactionImporter onImport={(xdr) => dispatch(importFromXdr(xdr))}/>
          </div>
        </div>
      </div>
    } else {
      let result = signTransaction(xdr, signers, networkObj);
      let transaction = new Transaction(xdr);

      let infoTable = {
        'Transaction Envelope XDR': <EasySelect plain={true}><pre className="so-code so-code__wrap"><code>{xdr}</code></pre></EasySelect>,
        'Source account': transaction.source,
        'Sequence number': transaction.sequence,
        'Transaction Fee (stroops)': transaction.fee,
        'Number of operations': transaction.operations.length,
        'Number of existing signatures': transaction.signatures.length,
      };

      let codeResult, submitLink, xdrLink, resultTitle, submitInstructions;

      if (!_.isUndefined(result.xdr)) {
        codeResult = <pre className="TxSignerResult__xdr so-code so-code__wrap" onClick={clickToSelect}><code>{result.xdr}</code></pre>;
        submitLink = <a
          className="s-button TxSignerResult__submit"
          href={txPostLink(result.xdr)}
          onClick={scrollOnAnchorOpen}
          >Submit to Post Transaction endpoint</a>;
        xdrLink = <a
          className="s-button TxSignerResult__submit"
          href={xdrViewer(result.xdr, 'TransactionEnvelope')}
          onClick={scrollOnAnchorOpen}
          >View in XDR Viewer</a>;
        resultTitle = <h3 className="TxSignerResult__title">Transaction signed!</h3>;
        submitInstructions = <p className="TxSignerResult__instructions">
          现在这个已经被签名, 你可以提交到网络中.
        </p>
      }

      let txDetails;
      if (result.xdr) { // Only show tree view if xdr is valid and exists
        txDetails = <div className="so-back TransactionSigner__details">
          <div className="so-chunk">
            <p className="TransactionSigner__details__title">Transaction result details</p>
            <TreeView className="TransactionSigner__details__tree" nodes={extrapolateFromXdr(result.xdr, 'TransactionEnvelope')} />
          </div>
        </div>
      }

      content = <div>
        <div className="so-back">
          <div className="so-chunk">
            <div className="TxSignerOverview TransactionSigner__overview">
              <div className="TxSignerOverview__titleBar">
                <p className="TxSignerOverview__titleBar__title">Transaction overview</p>
                <a className="TxSignerOverview__titleBar__reset"
                  onClick={() => dispatch(clearTransaction())}>
                  Clear and import new transaction</a>
              </div>
              <div className="simpleTable">
                {_.map(infoTable, (content, label) => {
                  return <div className="simpleTable__row" key={label}>
                    <div className="simpleTable__row__label">{label}</div>
                    <div className="simpleTable__row__content">{content}</div>
                  </div>
                })}
              </div>
            </div>
          </div>
          <div className="so-chunk">
            <div className="TxSignerKeys TransactionSigner__keys">
              <p className="TxSignerKeys__title">Signatures <HelpMark href="https://www.stellar.org/developers/learn/concepts/multi-sig.html" /></p>
              <div className="optionsTable">
                <OptionsTablePair label="Add Signer">
                  <MultiPicker
                    component={SecretKeyPicker}
                    value={signers}
                    onUpdate={(value) => dispatch(setSecrets(value))}
                  />
                </OptionsTablePair>
              </div>
            </div>
          </div>
        </div>
        <div className="so-back TxSignerResult TransactionSigner__result">
          <div className="so-chunk">
            {resultTitle}
            <p className="TxSignerResult__summary">{result.message}</p>
            {codeResult}
            {submitInstructions}
            {submitLink} {xdrLink}
          </div>
        </div>
        {txDetails}
      </div>
    }
    return <div className="TransactionSigner">
      <div className="so-back">
        <div className="so-chunk">
          <div className="pageIntro">
            <p>
              “业务签名”允许您向业务添加签名。在网络中只有签名后才能在业务中执行操作。
            </p>
            <p>
              对于简单业务，您只需要帐户的一个签名。 如果有多个源帐户或签名密钥，就可能需要多个签名。
            </p>
            <p><a href="https://www.stellar.org/developers/learn/concepts/multi-sig.html" target="_blank">获取更多关于签名的操作</a></p>
          </div>
        </div>
      </div>
      {content}
    </div>
  }
}

export default connect(chooseState)(TransactionSigner);

function chooseState(state) {
  return {
    state: state.transactionSigner,
    networkObj: NETWORK.available[state.network.current].networkObj,
  }
}


