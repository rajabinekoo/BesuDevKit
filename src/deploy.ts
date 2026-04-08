import { deployContract } from "./utils/contract";
import { accountsManagement } from "./utils/account";

async function main() {
  const [owner] = await accountsManagement.getAccounts();

  const deployedContract = await deployContract("Counter", {
    from: owner.address,
  });

  console.log(
    "Contract deployed at address:",
    deployedContract.options.address,
  );
}

void main();
