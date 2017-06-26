import axios from 'axios';
import dispatchInNewStack from '../utilities/dispatchInNewStack';
import {Keypair} from 'stellar-sdk';

export const GENERATE_NEW_KEYPAIR = 'GENERATE_NEW_KEYPAIR';
export function generateNewKeypair() {
  let keypair = Keypair.random();
  return {
    type: GENERATE_NEW_KEYPAIR,
    pubKey: keypair.accountId(),
    secretKey: keypair.seed(),
  }
}

export const UPDATE_FRIENDBOT_TARGET = 'UPDATE_FRIENDBOT_TARGET';
export function updateFriendbotTarget(target) {
  return {
    type: UPDATE_FRIENDBOT_TARGET,
    target,
  }
}

export const START_FRIENDBOT_REQUEST = 'START_FRIENDBOT_REQUEST';
export const FINISH_FRIENDBOT_REQUEST = 'FINISH_FRIENDBOT_REQUEST';
export function startFriendbotRequest(target) {
  return dispatch => {
    dispatch({
      type: START_FRIENDBOT_REQUEST,
      message: 'Loading...',
      status: 'loading',
    });

    axios.get('http://api.t.nbile.com/friendbot?addr=' + target)
      .then(r => {
        dispatchInNewStack(dispatch, {
          type: FINISH_FRIENDBOT_REQUEST,
          target,
          message: `恭喜，成功在测试网络上激活账户： funded ${target}`,
          status: 'success',
          code: '',
        })
      })
      .catch(e => {
        let code, message;
        if (e.status === 0) {
          code = '';
          message = '无法连接到Horizon server';
        } else {
          code = JSON.stringify(e.data, null, 2);
          message = `${target}账户激活失败`;
        }

        dispatchInNewStack(dispatch, {
          type: FINISH_FRIENDBOT_REQUEST,
          target,
          message,
          status: 'failure',
          code,
        })
      })
  }
}
