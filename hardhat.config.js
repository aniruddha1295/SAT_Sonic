import "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";
dotenv.config();

// Get private key from environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const API_KEY = process.env.ETHERSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.20",
  networks: {
    // Configuration for Filecoin Calibration testnet (for testing)
    filecoinCalibration: {
      type: "http",
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 314159,
    },
    // Configuration for Filecoin Mainnet (for production)
    filecoinMainnet: {
      type: "http",
      url: "https://api.node.glif.io",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 314,
    },
    // Configuration for Sepolia testnet (Ethereum testnet)
    sepolia: {
      type: "http",
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY || ""}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    // Add more networks as needed
  },
  etherscan: {
    apiKey: API_KEY,
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
};