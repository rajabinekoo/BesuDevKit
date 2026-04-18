# BesuDevKit

A smart contract development framework built on Hyperledger Besu with Hardhat-like experience.

## Overview

BesuDevKit is a comprehensive smart contract development environment that provides developers with a familiar workflow similar to Hardhat, but specifically designed for Hyperledger Besu. This project offers an integrated solution for compiling, testing, and deploying Ethereum-compatible smart contracts using Besu as the underlying blockchain node.

This framework supports deployment on any EVM-compatible blockchain network while providing a local development environment through Docker Compose.

## Features

<ul>
    <li>
        <b>Hardhat-like Development Experience</b>: Familiar commands and workflow
    </li>
    <li>
        <b>Besu Integration</b>: Built specifically for Hyperledger Besu node
    </li>
    <li>
        <b>Smart Contract Compilation</b>: Automatic compilation of Solidity contracts
    </li>
    <li>
        <b>Testing Framework</b>: Jest-based testing with coverage reports
    </li>
    <li>
        <b>Deployment Automation</b>: TypeScript deployment scripts
    </li>
    <li>
        <b>Configurable Environment</b>: Easily customizable configuration options
    </li>
</ul>

## Prerequisites

Before starting, ensure you have the following installed:

<ul>
    <li>
        Docker Compose
    </li>
    <li>
        Node.js (v20 or higher)
    </li>
    <li>
        pnpm package manager
    </li>
</ul>

## Installation

```bash
# Install dependencies using pnpm
pnpm install
```

### Development Environment Setup

#### 1. Start Besu Node

Before running any commands, you need to start the Besu development node:

```bash
docker compose up
```

This will start a local Besu node with pre-configured accounts and RPC endpoint at `http://localhost:8545`.

#### 2. Configuration

Configure your environment by modifying the settings in `src/config.ts`:

```javascript
const config = {
  accountsCount: 10, // Number of test accounts to initialize
  initAccountsEthBalance: 100, // Initial ETH balance for each account
  artifactsDirName: "artifacts", // Directory name for compiled contracts
  accountsStore: "wallets.json", // File to store wallet information
  rpcAddress: "http://127.0.0.1:8545", // RPC endpoint for Besu node
};

export default config;
```

### Available Scripts

#### Compile Contracts

```bash
pnpm compile
```

Compiles all Solidity contracts using the specified compiler version.

#### Run Tests

```bash
pnpm test          # Run tests once
pnpm test:watch    # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
```

#### Deploy Contracts

```bash
pnpm deploy
```

Deploys contracts to the connected Besu node using the configuration settings.

## Project Structure

```
src/
├── config.ts          # Configuration file
├── compile.ts         # Contract compilation script
├── deploy.ts          # Deployment script
└── tests/             # Test files (Jest)
```

## Usage Example

###### 1. Start Besu Node:

```bash
docker compose up
```

###### 2. Compile Contracts:

```bash
pnpm compile
```

###### 3. Run Tests:

```bash
pnpm test
```

###### 4. Deploy to Local Network:

```bash
pnpm deploy
```

###### 5. Customize Configuration in `src/config.ts` as needed

## Contributing

Contributions are welcome! Please fork the repository and create pull requests with your improvements.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

## License

This project is released under the MIT https://github.com/rajabinekoo/BesuDevKit/blob/main/LICENSE.
