import solc from "solc";
import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";

import config from "./config";
import { checkContractsOutDir, getPrecompiledContractsList } from "./utils/fs";
import {
  solcOutput,
  IContractPath,
  solcInputSources,
  ICompiledContract,
} from "./types";

async function compile(contracts: IContractPath[]): Promise<void> {
  const sources: solcInputSources = {};

  for (const c of contracts) {
    sources[c.name] = { content: await readFile(c.path, "utf8") };
  }

  const input = {
    language: "Solidity",
    sources,
    settings: {
      outputSelection: {
        "*": { "*": ["abi", "evm.bytecode"] },
      },
    },
  };

  const output: solcOutput = JSON.parse(solc.compile(JSON.stringify(input)));

  for (const contractName in output.contracts) {
    const contract = <ICompiledContract>(
      Object.values(output.contracts[contractName])[0]
    );
    const contractInsideName = Object.keys(output.contracts[contractName])[0];
    const outFile = join(
      __dirname,
      "..",
      config.artifactsDirName,
      contractInsideName + ".json",
    );
    await writeFile(
      outFile,
      JSON.stringify(
        {
          abi: contract.abi,
          bytecode: contract.evm.bytecode.object,
        },
        null,
        2,
      ),
    );
  }
}

async function main() {
  await checkContractsOutDir();
  const list = await getPrecompiledContractsList();
  await compile(list);
}

void main();
