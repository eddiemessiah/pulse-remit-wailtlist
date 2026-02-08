import { parseUnits, getAddress, formatEther } from "viem";
import { network } from "hardhat";
import * as fs from "fs";
import * as path from "path";

interface DeploymentResult {
    network: string;
    chainId: number;
    deployer: string;
    timestamp: string;
    contracts: {
        AgentRegistry: string;
        IdentityRegistry: string;
        RecipientRegistry: string;
        AgentFactory: string;
        LiFiExecutor: string;
        RemittanceVault: string;
    };
    configuration: {
        usdcAddress: string;
        maxExecutionLimit: string;
        consensusThreshold: string;
    };
}

async function main() {
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("              PULSEREMIT PROTOCOL DEPLOYMENT                    ");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("");

    const { viem } = await (network as any).connect();
    const [deployer] = await viem.getWalletClients();
    const publicClient = await viem.getPublicClient();

    const deployerAddress = deployer.account.address;
    const balance = await publicClient.getBalance({ address: deployerAddress });

    console.log(`📍 Network: ${network.name}`);
    console.log(`👤 Deployer: ${deployerAddress}`);
    console.log(`💰 Balance: ${formatEther(balance)} ETH`);
    console.log("");

    if (balance < parseUnits("0.01", 18)) {
        console.error("❌ Insufficient balance for deployment. Need at least 0.01 ETH");
        console.log("   Get testnet ETH from: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet");
        process.exit(1);
    }

    // Configuration
    const ensRegistryAddress = getAddress("0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e");
    const usdcAddress = getAddress("0x036CbD53842c5426634e7929541eC2318f3dCF7e"); // Base Sepolia USDC
    const maxLimit = parseUnits("1000", 6); // $1000 max per execution
    const consensusThreshold = parseUnits("500", 6); // $500 requires secondary approval

    console.log("📋 Configuration:");
    console.log(`   USDC Address: ${usdcAddress}`);
    console.log(`   Max Execution Limit: $1,000`);
    console.log(`   Consensus Threshold: $500`);
    console.log("");
    console.log("🚀 Starting deployment...");
    console.log("");

    // Deploy AgentRegistry
    console.log("1️⃣  Deploying AgentRegistry...");
    const agentRegistry = await viem.deployContract("AgentRegistry", [deployerAddress]);
    console.log(`   ✅ AgentRegistry: ${agentRegistry.address}`);

    // Deploy IdentityRegistry
    console.log("2️⃣  Deploying IdentityRegistry...");
    const identityRegistry = await viem.deployContract("IdentityRegistry", [deployerAddress, ensRegistryAddress]);
    console.log(`   ✅ IdentityRegistry: ${identityRegistry.address}`);

    // Deploy LiFiExecutor
    console.log("3️⃣  Deploying LiFiExecutor...");
    const lifiExecutor = await viem.deployContract("LiFiExecutor", [deployerAddress]);
    console.log(`   ✅ LiFiExecutor: ${lifiExecutor.address}`);

    // Deploy RecipientRegistry
    console.log("4️⃣  Deploying RecipientRegistry...");
    const recipientRegistry = await viem.deployContract("RecipientRegistry", [deployerAddress]);
    console.log(`   ✅ RecipientRegistry: ${recipientRegistry.address}`);

    // Deploy AgentFactory
    console.log("5️⃣  Deploying AgentFactory...");
    const agentFactory = await viem.deployContract("AgentFactory");
    console.log(`   ✅ AgentFactory: ${agentFactory.address}`);

    // Deploy RemittanceVault (implementation)
    console.log("6️⃣  Deploying RemittanceVault...");
    const vault = await viem.deployContract("RemittanceVault");
    console.log(`   ✅ RemittanceVault: ${vault.address}`);

    console.log("");
    console.log("⚙️  Initializing contracts...");

    // Initialize RemittanceVault
    console.log("   → Initializing RemittanceVault...");
    const hashInit = await vault.write.initialize([
        deployerAddress,
        usdcAddress,
        agentRegistry.address,
        identityRegistry.address,
        lifiExecutor.address,
        maxLimit,
        consensusThreshold
    ]);
    await publicClient.waitForTransactionReceipt({ hash: hashInit });
    console.log("   ✅ RemittanceVault initialized");

    // Whitelist Vault in LiFiExecutor
    console.log("   → Whitelisting Vault in LiFiExecutor...");
    const hashWhitelistVault = await lifiExecutor.write.setTargetWhitelist([vault.address, true]);
    await publicClient.waitForTransactionReceipt({ hash: hashWhitelistVault });
    console.log("   ✅ Vault whitelisted in LiFiExecutor");

    // Whitelist LI.FI Diamond as bridge target
    const lifiDiamond = getAddress("0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE");
    console.log("   → Whitelisting LI.FI Diamond in Vault...");
    const hashWhitelistLifi = await vault.write.setTargetWhitelisting([lifiDiamond, true]);
    await publicClient.waitForTransactionReceipt({ hash: hashWhitelistLifi });
    console.log("   ✅ LI.FI Diamond whitelisted in Vault");

    console.log("");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("                    DEPLOYMENT COMPLETE                         ");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("");
    console.log("📋 Contract Addresses:");
    console.log("───────────────────────────────────────────────────────────────");
    console.log(`   AgentRegistry:     ${agentRegistry.address}`);
    console.log(`   IdentityRegistry:  ${identityRegistry.address}`);
    console.log(`   RecipientRegistry: ${recipientRegistry.address}`);
    console.log(`   AgentFactory:      ${agentFactory.address}`);
    console.log(`   LiFiExecutor:      ${lifiExecutor.address}`);
    console.log(`   RemittanceVault:   ${vault.address}`);
    console.log("───────────────────────────────────────────────────────────────");
    console.log("");

    // Create deployment result
    const result: DeploymentResult = {
        network: network.name,
        chainId: 84532, // Base Sepolia
        deployer: deployerAddress,
        timestamp: new Date().toISOString(),
        contracts: {
            AgentRegistry: agentRegistry.address,
            IdentityRegistry: identityRegistry.address,
            RecipientRegistry: recipientRegistry.address,
            AgentFactory: agentFactory.address,
            LiFiExecutor: lifiExecutor.address,
            RemittanceVault: vault.address,
        },
        configuration: {
            usdcAddress: usdcAddress,
            maxExecutionLimit: "$1000",
            consensusThreshold: "$500",
        },
    };

    // Save deployment result to JSON
    const deploymentsDir = path.join(__dirname, "..", "deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const deploymentFile = path.join(deploymentsDir, `${network.name}-${Date.now()}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(result, null, 2));
    console.log(`📁 Deployment saved to: ${deploymentFile}`);

    // Generate .env.deployed file for frontend
    const envContent = `# PulseRemit Contract Addresses - ${network.name}
# Generated: ${result.timestamp}
# Add these to your .env.local file

NEXT_PUBLIC_VAULT_ADDRESS=${vault.address}
NEXT_PUBLIC_LIFI_EXECUTOR_ADDRESS=${lifiExecutor.address}
NEXT_PUBLIC_AGENT_REGISTRY_ADDRESS=${agentRegistry.address}
NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=${identityRegistry.address}
NEXT_PUBLIC_RECIPIENT_REGISTRY_ADDRESS=${recipientRegistry.address}
`;

    const envDeployedFile = path.join(deploymentsDir, ".env.deployed");
    fs.writeFileSync(envDeployedFile, envContent);
    console.log(`📁 Environment file saved to: ${envDeployedFile}`);
    console.log("");
    console.log("💡 Next Steps:");
    console.log("   1. Copy the addresses above to your frontend .env.local");
    console.log("   2. Or copy the contents of: contracts-repo/deployments/.env.deployed");
    console.log("   3. Restart your Next.js development server");
    console.log("");
    console.log("🔗 View on BaseScan:");
    console.log(`   https://sepolia.basescan.org/address/${vault.address}`);
    console.log("");

    return result;
}

main()
    .then((result) => {
        console.log("✨ Deployment successful!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exitCode = 1;
    });
