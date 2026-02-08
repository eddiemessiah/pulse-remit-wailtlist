import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable, defineConfig } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

const getVar = (name: string): string => {
  const val = process.env[name];
  if (!val) {
    try {
      return configVariable(name);
    } catch (e) {
      return "";
    }
  }

  // Check for the default placeholder which causes the crash
  if (name === "SEPOLIA_PRIVATE_KEY" && val.includes("your_private_key_here")) {
    console.error("\n🔴 CRITICAL ERROR: You have not updated the private key in contracts-repo/.env");
    console.error("   Please open 'contracts-repo/.env' and replace 'your_private_key_here' with your actual wallet private key.\n");
    process.exit(1);
  }

  // Auto-fix missing 0x prefix for private keys
  if (name === "SEPOLIA_PRIVATE_KEY" && !val.startsWith("0x")) {
    return `0x${val}`;
  }

  return val;
};

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: getVar("SEPOLIA_RPC_URL"),
      accounts: [getVar("SEPOLIA_PRIVATE_KEY")],
    },
    baseSepolia: {
      type: "http",
      chainType: "op",
      url: getVar("SEPOLIA_RPC_URL"),
      accounts: [getVar("SEPOLIA_PRIVATE_KEY")],
      chainId: 84532
    },
  },
});
