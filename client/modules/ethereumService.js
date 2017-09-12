/* eslint-disable */
import contractConfig from './config.json';

const contracts = {};

const networkIds = {
  mainnet: '1',
  morden: '2',
  ropsten: '3',
  kovan: '42',
};

window.onload = () => {
  contractConfig.contracts.forEach((contract) => {
    contracts[contract.name] = web3.eth.contract(contract.abi).at(contract.contractAddress)
  });

  console.log(contracts);
};

// export const getWeb3Status = () =>
//   new Promise((resolve, reject) => {
//     if (!web3) {
//       return reject({
//         message: 'NOT_FOUND',
//       });
//     }
//
//     return web3.version.getNetwork((err, netId) => {
//       if (netId.toString() !== networkIds.kovan) {
//         return reject({
//           message: 'WRONG_NETWORK',
//         });
//       }
//
//       return resolve();
//     });
//   });

export const getAccount = () => {
  if (!web3.eth.accounts || !web3.eth.accounts.length) { return false; }

  return web3.eth.accounts[0];
};

export const getBlockNumber = () =>
  new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((error, latestBlock) => {
      if (error) {
        return reject(error);
      }

      return resolve(latestBlock);
    });
  });



export const set = (num) =>
  new Promise((resolve, reject) => {
    contracts.SimpleStorage.set(num, (error, result) => {
      if (error) {
        return reject({
          message: error,
        });
      }

      return resolve(result);
    });
  });

window.set = set;

export const get = () =>
  new Promise((resolve, reject) => {
    contracts.SimpleStorage.get((error, result) => {
      if (error) {
        return reject({
          message: error,
        });
      }

      return resolve(result);
    });
  });

window.get = () => {
  get().then((data) => {
    console.log('GET SUCCESS', parseFloat(data));
  });
};
