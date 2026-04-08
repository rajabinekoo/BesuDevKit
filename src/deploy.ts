import { accounts } from "./utils/account";
import { deployContract } from "./utils/contract";

async function main() {
  const [owner] = await accounts.getAccounts();

  const deployedContract = await deployContract("Counter", {
    from: owner.address,
  });

  console.log(
    "Contract deployed at address:",
    deployedContract.options.address,
  );
}

void main();
