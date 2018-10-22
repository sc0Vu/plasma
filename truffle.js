const env = require('./env');
const WalletProvider = require('truffle-wallet-provider');
const Wallet = require('ethereumjs-wallet');
const devnetWallet = new Wallet(Buffer.from(env.pKey, 'hex'));

module.exports = {
  // Solidity compiler configuration
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: {
      provider: function() {
        return new WalletProvider(devnetWallet, env.rpcUrl);
      },
      gas: 4700000,
      network_id: "*", // Match any network id
    }
  }
};
