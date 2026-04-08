export interface IContractPath {
  path: string;
  name: string;
}

export interface ICompiledContract {
  abi: Array<IAbiItem>;
  evm: { bytecode: { object: string } };
}

export type IAbiItem =
  | {
      inputs: string[];
      name: string;
      outputs: [];
      stateMutability: "nonpayable" | "payable";
      type: "function";
    }
  | {
      anonymous: boolean;
      inputs: string[];
      name: string;
      type: "event";
    };
