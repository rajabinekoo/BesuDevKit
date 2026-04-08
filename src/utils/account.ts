import { Web3Account } from "web3";

import config from "../config";
import { transferEth, web3 } from "./web3";

class AccountManagement {
  private readonly accounts: Web3Account[] = [];

  public async getAccounts(): Promise<Web3Account[]> {
    if (this.accounts.length > 0) return this.accounts;
    const defaultAccount = await this.getDefaultAccount();
    for (let index = 0; index < config.accountsCount; index++) {
      const newAccount = await this.createLocalAccount();
      await transferEth(
        defaultAccount,
        newAccount.address,
        config.initAccountsEthBalance,
      );
      this.accounts.push(newAccount);
    }
    return this.accounts;
  }

  private async getDefaultAccount(): Promise<string> {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  }

  private async createLocalAccount() {
    const account = web3.eth.accounts.create();
    web3.eth.accounts.wallet.add(account.privateKey);
    return account;
  }
}

export const accountsManagement = new AccountManagement();
