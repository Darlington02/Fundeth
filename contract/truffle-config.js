require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {


  networks: {

    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY_1],
        providerOrUrl: process.env.INFURA_API_URL,
        numberOfAddresses: 1
      }),
      network_id:  "4",
      gas: 5500000,
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11"
    }
  },

};
