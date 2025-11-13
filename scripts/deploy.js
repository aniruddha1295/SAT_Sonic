import hre from "hardhat";
import fs from "fs";

async function main() {
  console.log("Deploying Sonic SAT contracts with Self Protocol integration...");
  console.log("Available hre properties:", Object.keys(hre));
  
  // Check if ethers is available
  if (!hre.ethers) {
    console.error("Ethers not available in hre");
    return;
  }

  // Get the contract factories
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy SonicSelfVerification contract first
  console.log("1. Deploying SonicSelfVerification contract...");
  const SonicSelfVerificationFactory = await hre.ethers.getContractFactory("SonicSelfVerification");
  const SonicSelfVerification = await SonicSelfVerificationFactory.deploy();
  await SonicSelfVerification.waitForDeployment();

  const verificationAddress = await SonicSelfVerification.getAddress();
  console.log(`SonicSelfVerification deployed to: ${verificationAddress}`);

  // Deploy SonicIPToken contract with verification contract address
  console.log("2. Deploying SonicIPToken contract...");
  const SonicIPTokenFactory = await hre.ethers.getContractFactory("SonicIPToken");
  const SonicIPToken = await SonicIPTokenFactory.deploy(verificationAddress);
  await SonicIPToken.waitForDeployment();

  const tokenAddress = await SonicIPToken.getAddress();
  console.log(`SonicIPToken deployed to: ${tokenAddress}`);

  console.log("Waiting for confirmations...");
  // Wait for confirmations to ensure contract is deployed
  // Only for testnet/mainnet, not needed for local networks
  if (network.name !== "hardhat" && network.name !== "localhost") {
    await SonicIPToken.deploymentTransaction().wait(5); // Wait for 5 confirmations
    console.log("Confirmed. Contract deployed successfully!");
    
    // Verify on block explorer (e.g. Etherscan) if not on a local network
    try {
      console.log("Verifying contract on block explorer...");
      await hre.run("verify:verify", {
        address: tokenAddress,
        constructorArguments: [verificationAddress],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.error("Error verifying contract:", error.message);
    }
  }

  // Save the contract addresses to a file for easy reference
  const contractAddresses = {
    SonicSelfVerification: verificationAddress,
    SonicIPToken: tokenAddress
  };
  
  fs.writeFileSync(
    "contract-addresses.json",
    JSON.stringify(contractAddresses, null, 2)
  );
  console.log("Contract addresses saved to contract-addresses.json");

  return { verificationAddress, tokenAddress };
}

// Execute deployment
main()
  .then((addresses) => {
    console.log("Deployment completed successfully!");
    console.log("Addresses:", addresses);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });