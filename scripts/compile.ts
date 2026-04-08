import solc from "solc";
import { join, resolve } from "node:path";
import { readdir, mkdir, readFile, writeFile } from "node:fs/promises";

import config from "../config";
import {
  solcOutput,
  IContractPath,
  solcInputSources,
  ICompiledContract,
} from "../types";

async function getContractsList(dir = ""): Promise<Array<IContractPath>> {
  const contractsDir = join(__dirname, "../contracts", dir);
  const contractsList = await readdir(contractsDir);
  const contractPaths: IContractPath[] = [];
  for (const contractName of contractsList) {
    if (!contractName.endsWith(".sol")) {
      const list = await getContractsList(join(dir, contractName));
      contractPaths.push(...list);
      continue;
    }
    contractPaths.push({
      name: contractName,
      path: join(contractsDir, contractName),
    });
  }
  return contractPaths;
}

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
  await mkdir(resolve(__dirname, "..", config.artifactsDirName), {
    recursive: true,
  });
  const list = await getContractsList();
  await compile(list);
}

void main();
