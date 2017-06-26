import React from 'react';
import TextPicker from './TextPicker';
import {Keypair} from 'stellar-sdk';

export default function PubKeyPicker(props) {
  return <TextPicker
    {...props}
    placeholder={props.placeholder || '例如: GCEXAMPLE5HWNK4AYSTEQ4UWDKHTCKADVS2AHF3UI2ZMO3DPUSM6Q4UG'}
    validator={(value) => {
      if (!Keypair.isValidPublicKey(value)) {
        return '公钥不可用';
      }
    }}
  />
}
