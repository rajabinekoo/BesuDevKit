import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";
import { mkdir, readdir, readFile } from "node:fs/promises";

import config from "../config";
import { IContract, IContractPath } from "../types";

export async function deleteDirectory(dirPath: string) {
  try {
    existsSync(dirPath);
    const command = `rm -rf ${dirPath}`;
    execSync(command, { stdio: "inherit" });
  } catch {}
}

export async function checkContractsOutDir() {
  const path = resolve(__dirname, "../..", config.artifactsDirName);
  await deleteDirectory(path);
  await mkdir(path, { recursive: true });
}

export async function getPrecompiledContractsList(
  dir = "",
): Promise<Array<IContractPath>> {
  const contractsDir = join(__dirname, "../../contracts", dir);
  const contractsList = await readdir(contractsDir);
  const contractPaths: IContractPath[] = [];
  for (const contractName of contractsList) {
    if (!contractName.endsWith(".sol")) {
      const list = await getPrecompiledContractsList(join(dir, contractName));
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

export async function getContractArtifact(
  contractName: string,
): Promise<IContract | null> {
  try {
    const path = join(
      __dirname,
      "../..",
      config.artifactsDirName,
      `${contractName.replace(".json", "")}.json`,
    );
    const content = await readFile(path, "utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}
