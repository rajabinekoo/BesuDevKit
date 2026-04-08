import { Contract, ContractAbi, PayableCallOptions } from "web3";

import { web3 } from "./web3";
import { getContractArtifact } from "./fs";

export async function getContract(
  contractName: string,
  address: string,
): Promise<Contract<ContractAbi>> {
  const artifact = await getContractArtifact(contractName);
  if (!artifact) throw new Error("Contract not found");
  return new web3.eth.Contract(artifact.abi, address);
}

export async function deployContract(
  contractName: string,
  options?: PayableCallOptions | undefined,
): Promise<Contract<ContractAbi>> {
  const artifact = await getContractArtifact(contractName);
  if (!artifact) throw new Error("Contract not found");
  const contract = new web3.eth.Contract(artifact.abi);
  return await contract
    .deploy({
      data: '0x' + artifact.bytecode,
    })
    .send(options);
}
