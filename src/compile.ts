import solc from "solc";
import { join } from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";

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

  if (Array.isArray(output.errors)) {
    const errors = output.errors.filter((err) => err.severity === "error");
    if (errors.length > 0) {
      errors.forEach((err, i) => {
        const seperator =
          (errors || []).length - 1 === i
            ? ""
            : "-------------------------------------";
        console.log([err.message, err.formattedMessage, seperator].join("\n"));
      });
      throw new Error("Compilation failed");
    }

    const warnings = output.errors.filter((err) => err.severity === "warning");
    if (warnings.length > 0) {
      console.warn("Warnings found during compilation:");
      warnings.forEach((err, i) => {
        const seperator =
          (output.errors || []).length - 1 === i
            ? ""
            : "-------------------------------------";
        console.log([err.message, err.formattedMessage, seperator].join("\n"));
      });
    }
  }

  for (const contractName in output.contracts) {
    const contract = <ICompiledContract>(
      Object.values(output.contracts[contractName])[0]
    );
    const path = contractName.split("/");
    path.pop();
    await mkdir(join(__dirname, "..", config.artifactsDirName, ...path), {
      recursive: true,
    });
    const outFile = join(
      __dirname,
      "..",
      config.artifactsDirName,
      contractName.replace(".sol", "") + ".json",
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
