import React from 'react';
import TextPicker from './TextPicker';
import {Keypair} from 'stellar-sdk';

export default function SecretKeyPicker(props) {
  return <TextPicker
    {...props}
    placeholder={props.placeholder || '例如: SAEXAMPLE6TLGEF6ASOTVTLFUK7LE2K2PFVPFGTEZMMVHH7KLLBBROEQ'}
    validator={(value) => {
      try {
        Keypair.fromSeed(value);
      } catch (err) {
        return '私钥不可用.';
      }
    }}
    className={props.className}
  />
}
