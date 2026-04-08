import { Contract, ContractAbi, Web3Account } from "web3";

import { deployContract } from "../utils/contract";
import { accountsManagement } from "../utils/account";

describe("Counter Smart Contract Test Cases", () => {
  let accounts: Web3Account[];
  let counterContract: Contract<ContractAbi>;

  beforeAll(async () => {
    accounts = await accountsManagement.getAccounts();
    counterContract = await deployContract("Counter", {
      from: accounts[0].address,
    });
  });

  it("should increase count value", async () => {
    const count1 = await counterContract.methods.count().call();
    expect(count1).toBe(0n);

    await counterContract.methods.increment().send({
      from: accounts[0].address,
    });

    const count2 = await counterContract.methods.count().call();
    expect(count2).toBe(1n);
  });
});
