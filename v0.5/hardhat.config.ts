import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env.local' })
dotenv.config({ path: __dirname + '/.env' })

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.NEXT_PRIVATE_ALCHEMY_API_KEY_TESTNET,
      accounts: [process.env.NEXT_PRIVATE_ACCOUNT1_SECRET_TESTNET, process.env.NEXT_PRIVATE_ACCOUNT2_SECRET_TESTNET] as string[],
    },
    polygon: {
      url: process.env.NEXT_PRIVATE_ALCHEMY_API_KEY_MAINNET,
      accounts: [process.env.NEXT_PRIVATE_ACCOUNT1_SECRET_MAINNET, process.env.NEXT_PRIVATE_ACCOUNT2_SECRET_MAINNET] as string[],
    },
  }
};

export default config;
