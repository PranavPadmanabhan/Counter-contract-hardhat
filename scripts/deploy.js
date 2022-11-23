// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const counterFactory = await ethers.getContractFactory("Counter");
  const counter = await counterFactory.deploy();
  console.log("Deploying please wait..");
  await counter.deployed();
  console.log(`deployed contract to : ${counter.address}`);
  // console.log(network.config);
  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await counter.deployTransaction.wait(6);
    await verify(counter.address, []);
  }

  const countvalue = await counter.getCount();
  console.log(`count : ${countvalue}`);
  const action = await counter.increment();
  await action.wait(1);
  const currentcountvalue = await counter.getCount();
  console.log(`updated count : ${currentcountvalue}`);
}

async function verify(contactAddress, args) {
  console.log("verifying Please wait...");
  try {
    await run("verify:verify", {
      address: contactAddress,
      constructorArguments: args,
    });
    console.log("verification Successful");
  } catch (e) {
    if (e.message.toLoweCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
