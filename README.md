# 🎵 Sonic SAT - Decentralized Audio NFT Platform with Identity Verification

A next-generation decentralized platform for recording, tokenizing, and managing audio content on the blockchain with **Self Protocol identity verification**. Built with Next.js, Filecoin, and IPFS for secure, permanent audio storage with privacy-first identity verification.

![Sonic SAT](https://img.shields.io/badge/Sonic%20SAT-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-15.3-black)
![Filecoin](https://img.shields.io/badge/Filecoin-Calibration-blue)
![Self Protocol](https://img.shields.io/badge/Self%20Protocol-Identity%20Verification-purple)
![IPFS](https://img.shields.io/badge/IPFS-Lighthouse-orange)

## ⚡ Key Features

- **🆔 Self Protocol Identity Verification**: Privacy-first identity verification using zero-knowledge proofs
- **🎙️ High-Quality Audio Recording**: Record audio directly in browser with real-time waveform visualization
- **🔐 Blockchain NFT Minting**: Tokenize audio as NFTs on Filecoin Calibration testnet
- **📦 Decentralized Storage**: Permanent storage using Lighthouse and IPFS
- **🛡️ Verification Gates**: Only verified users can create and tokenize audio content
- **💼 Creator Dashboard**: Manage your verified identity and audio NFT collection
- **🔗 Multi-Wallet Support**: Connect with MetaMask, WalletConnect, and more via RainbowKit
- **🌐 Production Ready**: Enterprise-grade error handling and user experience

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3** - React framework with App Router and Turbopack
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **RainbowKit** - Multi-wallet connection UI
- **Wagmi** - React hooks for Ethereum
- **Ethers.js v6** - Ethereum library for blockchain interactions
- **Lucide React** - Modern icon library

### Identity & Verification
- **Self Protocol** - Privacy-first identity verification
- **Zero-Knowledge Proofs** - Age and identity verification without revealing personal data
- **Passport/Aadhaar Support** - Multiple document types for global accessibility

### Storage & Backend
- **Lighthouse SDK** - IPFS file storage and encryption
- **IPFS** - Decentralized file storage
- **Hardhat** - Ethereum development environment
- **Solidity** - Smart contract development
- **OpenZeppelin** - Secure smart contract libraries

### Blockchain & Network
- **Filecoin Calibration** - Primary testnet for development and testing
- **Filecoin Mainnet** - Production deployment target
- **EVM Compatibility** - Works with Ethereum-compatible networks

## 📁 Project Structure

```
SONIC_SAT/
├── app/                           # Next.js App Router pages
│   ├── buyer/                     # Buyer dashboard page
│   ├── store/                     # Main audio recording & tokenization page
│   ├── test-verification/         # Self Protocol testing page
│   ├── verification-callback/     # Self Protocol callback handler
│   ├── page.tsx                   # Homepage
│   ├── layout.tsx                 # Root layout with providers
│   ├── globals.css                # Global styles and CSS variables
│   ├── providers.tsx              # Wagmi and RainbowKit providers
│   └── index.tsx                  # App entry point
├── components/                    # React components
│   ├── SelfProtocolVerification.tsx  # Identity verification component
│   ├── BuyerDashboardHeader.tsx   # Buyer dashboard header
│   ├── BuyerDashboardLayout.tsx   # Buyer dashboard layout
│   ├── AppRouter.tsx              # Application routing
│   ├── Footer.tsx                 # Site footer
│   ├── Header.tsx                 # Site header with wallet connection
│   ├── WalletConnect.tsx          # Wallet connection component
│   ├── FeatureTag.tsx             # Feature highlight tags
│   └── StatCard.tsx               # Statistics display cards
├── contracts/                     # Solidity smart contracts
│   ├── SonicSelfVerification.sol  # Self Protocol verification contract
│   └── SonicIPToken.sol           # Audio NFT token contract
├── contexts/                      # React contexts
│   ├── IPContext.tsx              # IP and user data context
│   └── RoleContext.tsx            # User role management context
├── hooks/                         # Custom React hooks
│   └── useEthers.ts               # Ethers.js integration hooks
├── lib/                           # Utility libraries and services
│   ├── contractConfig.ts          # Contract addresses and ABIs
│   ├── selfProtocolService.ts     # Self Protocol integration service
│   ├── sonicIpContract.ts         # IP token contract utilities
│   └── contract.ts                # Legacy contract configuration
├── public/                        # Static assets
│   ├── assets/                    # Images and media files
│   │   ├── background/            # Background images
│   │   └── logos/                 # Logo files
│   └── favicon.ico                # Site favicon
├── scripts/                       # Deployment and utility scripts
├── .env.local                     # Local environment variables
├── .env.production                # Production environment variables
├── hardhat.config.js              # Hardhat blockchain development config
├── next.config.ts                 # Next.js configuration with webpack
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This comprehensive guide
```

## 🚀 Getting Started - Complete Setup Guide

### Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js >= 22.0.0** - [Download from nodejs.org](https://nodejs.org/)
- **npm >= 10.0.0** (comes with Node.js) or **yarn >= 1.22.0**
- **Git** - [Download from git-scm.com](https://git-scm.com/)
- **MetaMask** or any Web3 wallet - [Install MetaMask](https://metamask.io/)
- **Self Protocol Mobile App** - Download from app store for identity verification
- **Lighthouse API Key** - [Get from lighthouse.storage](https://lighthouse.storage/)

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/hedauav/SONIC.git
cd SONIC/SONIC_SAT
```

#### 2. Install Dependencies
```bash
# Install all dependencies with legacy peer deps for compatibility
npm install --legacy-peer-deps

# Or if you prefer yarn
yarn install
```

**Important**: Use `--legacy-peer-deps` flag to handle dependency conflicts between packages.

#### 3. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Lighthouse IPFS Configuration
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_lighthouse_api_key_here

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

# Self Protocol Configuration
NEXT_PUBLIC_SELF_ENDPOINT=https://api.self.xyz
NEXT_PUBLIC_SELF_APP_NAME=Sonic SAT
NEXT_PUBLIC_SELF_SCOPE=sonic-sat-verification

# Smart Contract Addresses (Filecoin Calibration Testnet)
NEXT_PUBLIC_SONIC_VERIFICATION_CONTRACT=0xe797FD53EE2254af2D2d35399486E53b7e6ba5d5
NEXT_PUBLIC_SONIC_IP_TOKEN_CONTRACT=0x332b7fefb103ce489b20D461bdDf253Fe305678E

# Network Configuration
NEXT_PUBLIC_NETWORK_NAME=Filecoin Calibration
NEXT_PUBLIC_NETWORK_RPC=https://api.calibration.node.glif.io/rpc/v1
NEXT_PUBLIC_CHAIN_ID=314159
```

#### 4. Get Required API Keys

**Lighthouse API Key:**
1. Visit [lighthouse.storage](https://lighthouse.storage/)
2. Sign up for an account
3. Generate an API key from your dashboard
4. Add it to your `.env.local` file

**WalletConnect Project ID:**
1. Visit [cloud.walletconnect.com](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID
4. Add it to your `.env.local` file

#### 5. Install Self Protocol Mobile App

For identity verification, you'll need the Self Protocol app:
- **iOS**: Search "Self Protocol" in App Store
- **Android**: Search "Self Protocol" in Google Play Store

#### 6. Configure MetaMask for Filecoin Calibration

Add Filecoin Calibration testnet to MetaMask:
- **Network Name**: Filecoin Calibration
- **RPC URL**: `https://api.calibration.node.glif.io/rpc/v1`
- **Chain ID**: `314159`
- **Currency Symbol**: `tFIL`
- **Block Explorer**: `https://calibration.filfox.info/`

#### 7. Get Testnet FIL

Get testnet FIL for transactions:
1. Visit [faucet.calibration.fildev.network](https://faucet.calibration.fildev.network/)
2. Enter your wallet address
3. Request testnet FIL

#### 8. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

#### 9. Verify Installation

1. **Frontend**: Navigate to `http://localhost:3000` - should load the homepage
2. **Wallet Connection**: Click "Connect Wallet" - should show wallet options
3. **Network**: Ensure MetaMask is connected to Filecoin Calibration
4. **Self Protocol**: Go to `/store` page and test identity verification

## 🎯 Platform Usage Guide

### Complete User Flow

#### 1. Identity Verification (Required First Step)

**Self Protocol Verification:**
1. Navigate to `/store` page
2. Connect your Web3 wallet to Filecoin Calibration
3. Complete Self Protocol identity verification:
   - Scan QR code with Self Protocol mobile app
   - Take photo of passport or Aadhaar card
   - Complete selfie verification
   - Wait for proof generation
4. Verification is recorded on blockchain (valid for 30 days)

**Alternative Verification:**
- If Self Protocol fails, use the "Alternative Verification" option
- This provides temporary verification for development/testing

#### 2. Audio Recording & Creation

**Recording Process:**
1. After verification, access the recording interface
2. Grant microphone permissions when prompted
3. Click record button to start recording
4. Monitor real-time waveform visualization
5. Click stop to end recording
6. Preview your audio with playback controls

**Audio Upload:**
1. Click "Upload to IPFS" after recording
2. Audio is encrypted and stored on IPFS via Lighthouse
3. Receive IPFS hash for permanent storage
4. Audio is now ready for tokenization

#### 3. NFT Tokenization

**Minting Process:**
1. Enter NFT metadata:
   - **Token Name**: Descriptive name for your audio NFT
   - **Description**: Detailed description of the content
   - **Creator Info**: Your verified identity information
2. Review gas fees and transaction details
3. Click "Tokenize & Store on Blockchain"
4. Confirm transaction in MetaMask
5. Wait for blockchain confirmation
6. Receive NFT token ID and transaction hash

#### 4. Collection Management

**My Collection Features:**
1. Navigate to collection page
2. View all your tokenized audio NFTs
3. Play audio directly from IPFS
4. View NFT metadata and blockchain details
5. Share IPFS links with others
6. Track verification status and expiry

## 🔧 Smart Contract Development & Deployment

### Local Development

#### 1. Compile Contracts
```bash
npx hardhat compile
```

#### 2. Run Local Tests
```bash
npx hardhat test
```

#### 3. Deploy to Local Network
```bash
# Start local Hardhat network
npx hardhat node

# Deploy contracts (in another terminal)
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet Deployment (Filecoin Calibration)

#### 1. Configure Hardhat for Filecoin
Update `hardhat.config.js` with Filecoin Calibration network:
```javascript
networks: {
  calibration: {
    url: "https://api.calibration.node.glif.io/rpc/v1",
    accounts: [process.env.PRIVATE_KEY],
    chainId: 314159
  }
}
```

#### 2. Deploy to Calibration Testnet
```bash
npx hardhat run scripts/deploy.js --network calibration
```

#### 3. Update Contract Addresses
After deployment, update the contract addresses in:
- `lib/contractConfig.ts`
- `.env.local`
- `.env.production`

### Production Deployment (Filecoin Mainnet)

```bash
# Deploy to Filecoin mainnet
npx hardhat run scripts/deploy.js --network filecoin

# Verify contracts (if supported)
npx hardhat verify --network filecoin <CONTRACT_ADDRESS>
```

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm run start

# Or deploy to Vercel/Netlify
vercel --prod
```

### Build Verification
```bash
# Check for build errors
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 🌐 Supported Networks & Contracts

### Primary Network
- **Filecoin Calibration Testnet** (Development)
  - Chain ID: `314159`
  - RPC: `https://api.calibration.node.glif.io/rpc/v1`
  - SonicSelfVerification: `0xe797FD53EE2254af2D2d35399486E53b7e6ba5d5`
  - SonicIPToken: `0x332b7fefb103ce489b20D461bdDf253Fe305678E`

### Production Network
- **Filecoin Mainnet** (Production)
  - Chain ID: `314`
  - RPC: `https://api.node.glif.io/rpc/v1`
  - Contracts: TBD (deploy when ready for production)

## 🔑 Complete Environment Variables Reference

### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_LIGHTHOUSE_API_KEY` | Lighthouse IPFS storage API key | `7d4a2b8c...` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project identifier | `a1b2c3d4...` |

### Self Protocol Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SELF_ENDPOINT` | Self Protocol API endpoint | `https://api.self.xyz` |
| `NEXT_PUBLIC_SELF_APP_NAME` | Application name for Self Protocol | `Sonic SAT` |
| `NEXT_PUBLIC_SELF_SCOPE` | Verification scope identifier | `sonic-sat-verification` |

### Smart Contract Addresses
| Variable | Description | Testnet Address |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SONIC_VERIFICATION_CONTRACT` | Self Protocol verification contract | `0xe797FD53EE2254af2D2d35399486E53b7e6ba5d5` |
| `NEXT_PUBLIC_SONIC_IP_TOKEN_CONTRACT` | Audio NFT token contract | `0x332b7fefb103ce489b20D461bdDf253Fe305678E` |

### Network Configuration
| Variable | Description | Value |
|----------|-------------|-------|
| `NEXT_PUBLIC_NETWORK_NAME` | Display name for network | `Filecoin Calibration` |
| `NEXT_PUBLIC_NETWORK_RPC` | RPC endpoint URL | `https://api.calibration.node.glif.io/rpc/v1` |
| `NEXT_PUBLIC_CHAIN_ID` | Network chain identifier | `314159` |

## 🚨 Troubleshooting Common Issues

### Self Protocol Issues

**"Proof Failed" Error:**
- Ensure good lighting when taking document photos
- Use passport instead of other documents (higher success rate)
- Check stable internet connection
- Update Self Protocol mobile app to latest version
- Try alternative verification if Self Protocol fails repeatedly

**QR Code Not Loading:**
- Check browser console for errors
- Ensure you're on Filecoin Calibration network
- Refresh the page and try again
- Use "Open in Self App" direct link as fallback

### Wallet Connection Issues

**MetaMask Not Connecting:**
- Ensure MetaMask is installed and unlocked
- Check you're on the correct network (Filecoin Calibration)
- Clear browser cache and cookies
- Try refreshing the page

**Network Configuration:**
- Manually add Filecoin Calibration network to MetaMask
- Ensure RPC URL is correct: `https://api.calibration.node.glif.io/rpc/v1`
- Chain ID must be `314159`

### Build & Development Issues

**Dependency Conflicts:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Environment Variables Not Loading:**
- Ensure `.env.local` file is in root directory
- Restart development server after changing environment variables
- Check variable names start with `NEXT_PUBLIC_`

**IPFS Upload Failures:**
- Verify Lighthouse API key is correct
- Check network connectivity
- Ensure sufficient storage quota on Lighthouse account

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript type checking

# Smart Contracts
npx hardhat compile     # Compile contracts
npx hardhat test        # Run contract tests
npx hardhat node       # Start local blockchain
npx hardhat clean      # Clean compiled artifacts

# Deployment
vercel --prod          # Deploy to Vercel
npm run build && npm run start  # Local production test
```

## 🤝 Contributing Guidelines

### Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/SONIC.git
   cd SONIC/SONIC_SAT
   ```

2. **Setup Development Environment**
   ```bash
   npm install --legacy-peer-deps
   cp .env.example .env.local  # Configure your environment
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Development Standards**
   - Follow TypeScript strict mode
   - Use Tailwind CSS for styling
   - Write comprehensive tests for new features
   - Ensure Self Protocol integration works
   - Test on Filecoin Calibration testnet

5. **Testing Checklist**
   - [ ] Wallet connection works
   - [ ] Self Protocol verification completes
   - [ ] Audio recording functions properly
   - [ ] IPFS upload succeeds
   - [ ] NFT minting works on testnet
   - [ ] No console errors
   - [ ] Responsive design works

6. **Submit Pull Request**
   - Provide clear description of changes
   - Include screenshots/videos for UI changes
   - Reference any related issues
   - Ensure all tests pass

### Code Style Guidelines

- **TypeScript**: Use strict typing, avoid `any`
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind CSS classes, avoid custom CSS
- **Naming**: Use descriptive variable and function names
- **Comments**: Document complex logic and Self Protocol integrations

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments & Credits

### Core Technologies
- **[Self Protocol](https://self.xyz/)** - Privacy-first identity verification
- **[Filecoin](https://filecoin.io/)** - Decentralized storage network
- **[Lighthouse](https://lighthouse.storage/)** - IPFS storage and encryption
- **[IPFS](https://ipfs.io/)** - InterPlanetary File System
- **[Next.js](https://nextjs.org/)** - React framework
- **[RainbowKit](https://www.rainbowkit.com/)** - Wallet connection UI
- **[Wagmi](https://wagmi.sh/)** - React hooks for Ethereum
- **[Ethers.js](https://ethers.org/)** - Ethereum library
- **[OpenZeppelin](https://openzeppelin.com/)** - Smart contract security
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Special Thanks
- Filecoin Foundation for testnet support
- Self Protocol team for identity verification infrastructure
- Lighthouse team for IPFS storage solutions
- Open source community for tools and libraries

## 📞 Support & Contact

### Getting Help
- **Documentation**: This README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/hedauav/SONIC/issues)
- **Discussions**: [GitHub Discussions](https://github.com/hedauav/SONIC/discussions)

### Project Links
- **Repository**: [https://github.com/hedauav/SONIC](https://github.com/hedauav/SONIC)
- **Live Demo**: [Coming Soon - Deploy to production]
- **Documentation**: [This README]

### Maintainers
- **Primary**: [@hedauav](https://github.com/hedauav)
- **Contributors**: See [Contributors](https://github.com/hedauav/SONIC/contributors)

---

## 🚀 Quick Start Summary

```bash
# 1. Clone and setup
git clone https://github.com/hedauav/SONIC.git
cd SONIC/SONIC_SAT
npm install --legacy-peer-deps

# 2. Configure environment
cp .env.example .env.local
# Add your API keys to .env.local

# 3. Start development
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
# Connect wallet to Filecoin Calibration
# Complete Self Protocol verification
# Start creating audio NFTs!
```

**🎵 Welcome to the future of decentralized audio content creation with privacy-first identity verification!**

---

**⚡ Powered by Filecoin, IPFS & Self Protocol**




