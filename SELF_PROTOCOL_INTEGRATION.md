# Self Protocol Integration for Sonic SAT

This document outlines the Self Protocol integration implementation for the Sonic SAT audio NFT platform.

## Overview

The integration provides identity verification using Self Protocol's zero-knowledge proof system, ensuring only verified users can create audio NFTs while maintaining privacy.

## Architecture

### Smart Contracts

1. **SonicSelfVerification.sol** - Main verification contract
   - Handles Self Protocol proof verification
   - Manages user verification status and expiry
   - Tracks creator profiles and reputation
   - Provides verification levels (Basic, Enhanced, Premium)

2. **SonicIPToken.sol** - Enhanced NFT contract
   - Requires Self Protocol verification for minting
   - Tracks creator verification status at mint time
   - Integrates with verification contract for stats

### Frontend Components

1. **SelfProtocolService** - Core service layer
   - Handles Self Protocol app creation
   - Manages proof verification
   - Blockchain integration for storing verification

2. **SelfProtocolVerification** - React component
   - QR code display for verification
   - Verification status management
   - User-friendly verification flow

## Installation

### 1. Install Dependencies

```bash
npm install @selfxyz/qrcode @selfxyz/core
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Self Protocol Configuration
NEXT_PUBLIC_SELF_APP_NAME=Sonic SAT
NEXT_PUBLIC_SELF_SCOPE=sonic-sat-verification
NEXT_PUBLIC_SELF_ENDPOINT=https://api.self.xyz
SELF_VERIFICATION_HUB_ADDRESS=0x...
```

### 3. Deploy Contracts

```bash
# Deploy to testnet
npx hardhat run scripts/deploy.js --network filecoinCalibration

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network filecoinMainnet
```

## Usage

### 1. User Verification Flow

```typescript
import { SelfProtocolVerification } from '../components/SelfProtocolVerification';

function VerificationPage() {
  const handleVerificationComplete = (result) => {
    console.log('User verified:', result);
    // Redirect to audio creation
  };

  return (
    <SelfProtocolVerification
      onVerificationComplete={handleVerificationComplete}
      contractAddress={VERIFICATION_CONTRACT_ADDRESS}
      contractABI={VERIFICATION_CONTRACT_ABI}
    />
  );
}
```

### 2. Check Verification Status

```typescript
import { selfProtocolService } from '../lib/selfProtocolService';

const checkUserVerification = async (userAddress) => {
  const status = await selfProtocolService.checkUserVerification(
    userAddress,
    contractAddress,
    contractABI
  );
  
  return status.isVerified && !status.isExpired;
};
```

### 3. Enhanced NFT Minting

The NFT contract now automatically checks verification:

```solidity
function mintAudioToken(
    address to,
    string memory metadataURI,
    string memory audioHash
) public returns (uint256) {
    // Automatically checks Self Protocol verification
    (bool isVerified, , ) = verificationContract.isUserVerified(to);
    require(isVerified, "Creator must be verified via Self Protocol");
    
    // Mint NFT and update creator stats
    // ...
}
```

## Verification Levels

### Basic (Level 0)
- Age verification (18+)
- Identity verification
- Basic passport validation

### Enhanced (Level 1)
- Basic verification +
- Nationality disclosure
- Enhanced document validation

### Premium (Level 2)
- Enhanced verification +
- Additional attributes
- Highest trust level

## Security Features

### Smart Contract Security
- ReentrancyGuard protection
- Pausable functionality
- Role-based access control
- Proof replay attack prevention

### Privacy Protection
- Zero-knowledge proofs
- Selective disclosure
- No sensitive data stored on-chain
- Privacy-preserving verification

## Integration Points

### 1. User Onboarding
- Verification required before audio creation
- One-time verification with 1-year validity
- Automatic renewal reminders

### 2. Marketplace Enhancement
- Verified creator badges
- Filter by verification status
- Enhanced trust indicators
- Reputation scoring

### 3. Creator Profiles
- Verification status display
- Creator statistics
- Reputation scores
- Activity tracking

## Testing

### Local Testing
```bash
# Start local hardhat node
npx hardhat node

# Deploy contracts locally
npx hardhat run scripts/deploy.js --network localhost

# Run tests
npx hardhat test
```

### Testnet Testing
1. Get testnet tokens from faucet
2. Deploy to Filecoin Calibration testnet
3. Test verification flow with Self Protocol app
4. Verify contract interactions

## Production Deployment

### 1. Contract Deployment
```bash
# Deploy to mainnet
npx hardhat run scripts/deploy.js --network filecoinMainnet

# Verify contracts
npx hardhat verify --network filecoinMainnet <CONTRACT_ADDRESS>
```

### 2. Frontend Configuration
- Update contract addresses in environment variables
- Configure Self Protocol production endpoints
- Enable production verification flow

### 3. Monitoring
- Set up contract event monitoring
- Track verification success rates
- Monitor gas usage and optimization

## Troubleshooting

### Common Issues

1. **Self Protocol packages not found**
   - Run `npm install @selfxyz/qrcode @selfxyz/core`
   - Check package.json dependencies

2. **Verification fails**
   - Check Self Protocol app is installed
   - Verify passport is supported (174 countries)
   - Ensure user meets age requirements

3. **Contract deployment fails**
   - Check network configuration
   - Verify sufficient gas and tokens
   - Confirm contract compilation

### Support Resources
- [Self Protocol Documentation](https://docs.self.xyz)
- [Self Protocol Discord](https://discord.gg/self)
- [Sonic SAT Support](mailto:support@sonicsat.com)

## Future Enhancements

### Planned Features
- Multi-document support (EU ID cards)
- Enhanced reputation algorithms
- Cross-chain verification
- Advanced analytics dashboard

### Integration Opportunities
- KYC compliance reporting
- Regulatory compliance tools
- Enhanced marketplace features
- Creator monetization tools

## License

This integration is part of the Sonic SAT platform and follows the same licensing terms.
