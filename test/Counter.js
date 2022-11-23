const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("Counter", async () => {
  let counterFactory, counter;
  beforeEach(async () => {
    counterFactory = await ethers.getContractFactory("Counter");
    counter = await counterFactory.deploy();
    count = await counter.getCount();
  });

  it("initial value is 0", async () => {
    const currentValue = await counter.getCount();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should increment when incremented", async function () {
    const expectedValue = "1";
    const action = await counter.increment();
    await action.wait(1);
    const updatedVal = await counter.getCount();
    assert.equal(updatedVal.toString(), expectedValue);
  });

  it("Should decrement when decremented", async function () {
    const expectedValue = "0";
    await counter.increment();
    const action = await counter.decrement();
    await action.wait(1);
    const updatedVal = await counter.getCount();
    assert.equal(updatedVal.toString(), expectedValue);
  });
});
