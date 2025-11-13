// Contract configuration for Sonic SAT Self Protocol integration
export const CONTRACT_ADDRESSES = {
  // Filecoin Calibration Testnet
  SONIC_VERIFICATION: process.env.NEXT_PUBLIC_SONIC_VERIFICATION_CONTRACT || "0xe797FD53EE2254af2D2d35399486E53b7e6ba5d5",
  SONIC_IP_TOKEN: process.env.NEXT_PUBLIC_SONIC_IP_TOKEN_CONTRACT || "0x332b7fefb103ce489b20D461bdDf253Fe305678E",
} as const;

// Network configuration
export const NETWORK_CONFIG = {
  chainId: 314159, // Filecoin Calibration
  name: "Filecoin Calibration",
  rpcUrl: "https://api.calibration.node.glif.io/rpc/v1",
  blockExplorer: "https://calibration.filscan.io/",
  currency: {
    name: "Filecoin",
    symbol: "tFIL",
    decimals: 18,
  },
} as const;

// Contract ABIs (simplified - add full ABI when needed)
export const SONIC_VERIFICATION_ABI = [
  // Key functions for frontend integration
  "function isUserVerified(address user) external view returns (bool isVerified, uint8 level, uint256 expiresAt)",
  "function getUserVerification(address user) external view returns (tuple(uint8 status, uint8 level, uint256 verifiedAt, uint256 expiresAt, bytes32 selfProofHash, string nationality, bool isMinimumAge, uint256 lastUpdated))",
  "function getCreatorProfile(address creator) external view returns (tuple(bool isActive, uint256 totalNFTsCreated, uint256 totalSales, uint256 reputationScore, uint256 joinedAt, uint256 lastActivityAt))",
  "function verifyUser(bytes32 selfProofHash, uint8 level, string memory nationality, bool isMinimumAge) external",
  "event UserVerified(address indexed user, uint8 level, uint256 verifiedAt, uint256 expiresAt)",
];

export const SONIC_IP_TOKEN_ABI = [
  // Key functions for frontend integration
  "function mintAudioToken(address to, string memory metadataURI, string memory audioHash) external returns (uint256)",
  "function isTokenFromVerifiedCreator(uint256 tokenId) external view returns (bool)",
  "function getTokenVerificationInfo(uint256 tokenId) external view returns (address creator, bool wasVerified, bool currentlyVerified)",
  "function getAudioMetadata(uint256 tokenId) external view returns (string memory)",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function balanceOf(address owner) external view returns (uint256)",
  "event AudioTokenized(uint256 indexed tokenId, address indexed creator, string metadataURI)",
];

// Verification levels enum
export enum VerificationLevel {
  BASIC = 0,
  ENHANCED = 1,
  PREMIUM = 2,
}

// Verification status enum
export enum VerificationStatus {
  UNVERIFIED = 0,
  PENDING = 1,
  VERIFIED = 2,
  EXPIRED = 3,
  REVOKED = 4,
}

// Helper functions
export const getContractAddress = (contractName: keyof typeof CONTRACT_ADDRESSES): string => {
  return CONTRACT_ADDRESSES[contractName];
};

export const getVerificationLevelName = (level: number): string => {
  const levels = ["Basic", "Enhanced", "Premium"];
  return levels[level] || "Unknown";
};

export const getVerificationStatusName = (status: number): string => {
  const statuses = ["Unverified", "Pending", "Verified", "Expired", "Revoked"];
  return statuses[status] || "Unknown";
};

// Export contract addresses for backward compatibility
export const SONIC_VERIFICATION_CONTRACT_ADDRESS = CONTRACT_ADDRESSES.SONIC_VERIFICATION;
export const SONIC_IP_TOKEN_CONTRACT_ADDRESS = CONTRACT_ADDRESSES.SONIC_IP_TOKEN;
