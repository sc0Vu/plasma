const Web3 = require('web3');
const env = require('./env');
const web3 = new Web3(env.rpcUrl);
const axios = require('axios');
const plasmaUrl = 'http://localhost:3001/';
const plasma = axios.create({
  baseURL: plasmaUrl,
  timeout: 30000,
  headers: {
    'X-Performance-Test': '1'
  }
});
const txNumber = 100;

function getAddress(index) {
  if (typeof index !== 'number') {
    throw new Error('Index must be number');
  }
  index += 1;
  index = index.toString(16);
  return '0x' + index.padStart(40, '0');
};

setTimeout(async () => {
  // transfer eth to each account
  // const accounts = await web3.eth.getAccounts();
  // for (let i=0; i<accounts.length; i++) {
  //   if (accounts[i] !== env.plasmaOperatorAddress) {
  //     await web3.eth.sendTransaction({
  //       from: env.plasmaOperatorAddress,
  //       to: accounts[i],
  //       value: web3.utils.toWei('1000', 'ether')
  //     }); 
  //   }
  // }
  // depost money to plasma
  await plasma.post('/deposit', {
    address: env.plasmaOperatorAddress,
    amount: 100
  });
  // mine the block
  await plasma.post('/mineBlock');

  // let utxo = await plasma.get('/utxo');
  // console.log(utxo.data);
  console.time('Produce ' + txNumber + ' transactions.');
  // do transactions in plasma
  for (let i=0; i<txNumber; i++) {
    await plasma.post('/transact', {
      from: env.plasmaOperatorAddress,
      to: getAddress(i),
      amount: 0.1
    });
    // mine the block
    await plasma.post('/mineBlock');
  }
  console.timeEnd('Produce ' + txNumber + ' transactions.');
  
  // utxo = await plasma.get('/utxo');
  // console.log(utxo.data);
}, 100);