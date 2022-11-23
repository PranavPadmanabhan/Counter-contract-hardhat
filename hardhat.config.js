require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */
const API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.17",
  networks: {},
  etherscan: {
    apiKey: API_KEY,
  },
  gasReporter:{
    enabled:true
  }
};
