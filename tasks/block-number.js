const { task } = require("hardhat/config");

task("block-number", "Print current block number").setAction(
  async (taskArgs, hre) => {
    const block = await hre.ethers.provider.getBlockNumber();
    console.log(`current block number : ${block}`);
  }
);

module.exports = {};
