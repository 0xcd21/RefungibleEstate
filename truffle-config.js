require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('babel-register');
require('babel-polyfill');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const KOVAN_URL = process.env.KOVAN_URL;
//console.log(PRIVATE_KEY, KOVAN_URL);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      // Match any network id.
      network_id: "*"
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          [PRIVATE_KEY],
          'https://kovan.infura.io/v3/69faa0ff70d74c9894ec5cf1a4062ff6'
        );
      },
      network_id: '*',
      skipDryRun: true,
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.6",
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  }
}
