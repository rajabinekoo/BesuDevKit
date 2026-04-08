import { ContractAbi } from "web3";

export interface IContractPath {
  path: string;
  name: string;
}

export interface ICompiledContract {
  abi: ContractAbi;
  evm: { bytecode: { object: string } };
}

export interface IContract {
  abi: ContractAbi;
  bytecode: string;
}
