import { join } from "node:path";
import { Web3Account } from "web3";
import { readFile, unlink, writeFile } from "node:fs/promises";

import config from "../config";
import { transferEth, web3 } from "./web3";

class AccountManagement {
  private readonly accounts: Web3Account[] = [];

  public async getAccounts(): Promise<Web3Account[]> {
    if (this.accounts.length > 0) return this.accounts;

    const loadedAccounts = await this.loadAccountsStore();
    if (Array.isArray(loadedAccounts)) {
      this.accounts.push(...loadedAccounts);
      return this.accounts;
    }

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
    await this.saveAccountsStore();
    return this.accounts;
  }

  private async saveAccountsStore(): Promise<void> {
    const path = join(__dirname, "../../", config.accountsStore);
    await writeFile(
      path,
      JSON.stringify(this.accounts.map((a) => a.privateKey)),
      "utf8",
    );
  }

  private async loadAccountsStore(): Promise<Web3Account[] | null> {
    const path = join(__dirname, "../../", config.accountsStore);
    try {
      const privateKeys = JSON.parse(
        await readFile(path, "utf8"),
      ) as Array<string>;
      return privateKeys.map((pvKey) => {
        web3.eth.accounts.wallet.add(pvKey);
        return web3.eth.accounts.privateKeyToAccount(pvKey);
      });
    } catch {
      await (async () => {
        try {
          await unlink(path);
        } catch {}
      })();
      return null;
    }
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
