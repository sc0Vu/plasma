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
      host: "localhost",
      port: 8545,
      gas: 6721975,
      network_id: "*", // Match any network id
    }
  }
};
