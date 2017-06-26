import {Network, Networks} from 'stellar-sdk';

const NETWORK = {
  available: {
    test: {
      url: 'http://api.t.nbile.com',
      networkObj: new Network(Networks.TESTNET),
    }
    // ,
    // public: {
    //   url: 'http://api.nbile.com',
    //   networkObj: new Network(Networks.PUBLIC),
    // }
  },
  defaultName: 'test',
};
export default NETWORK;
