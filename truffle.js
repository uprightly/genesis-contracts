require('babel-register')({
  ignore: /node_modules\/(?!zeppelin-solidity)/
});
require('babel-polyfill');

var HDWalletProvider = require("truffle-hdwallet-provider");

// this secrets file is not included in the git repo. add it yourself with your secrets for deploys.
var secrets = require("./secrets.json");

function provider(network) {
  return new HDWalletProvider(secrets[network].mnemonic, `https://${network}.infura.io/${secrets[network].infuraApiKey}`);
}

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
      gas: 6090000
    },
    testrpc: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
      gas: 6090000
    },
    ropsten: {
      network_id: 3,
      provider: provider('ropsten'),
      gas: 4100000
    }
  }
};
