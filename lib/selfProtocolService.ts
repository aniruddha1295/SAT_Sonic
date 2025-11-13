// Lightweight Self Protocol service without heavy dependencies
import { ethers } from "ethers";

/**
 * Lightweight Self Protocol verification service for Sonic SAT
 * Uses Self Protocol API directly without heavy client-side packages
 */
export class SelfProtocolService {
  private apiEndpoint: string;
  private appName: string;
  private scope: string;
  private signer: ethers.Signer | null = null;

  constructor() {
    this.apiEndpoint = process.env.NEXT_PUBLIC_SELF_ENDPOINT || "https://api.self.xyz";
    this.appName = process.env.NEXT_PUBLIC_SELF_APP_NAME || "Sonic SAT";
    this.scope = process.env.NEXT_PUBLIC_SELF_SCOPE || "sonic-sat-verification";
  }

  /**
   * Set the signer for blockchain interactions
   */
  setSigner(signer: ethers.Signer) {
    this.signer = signer;
  }

  /**
   * Generate Self Protocol verification URL (lightweight approach)
   */
  async generateVerificationURL(userAddress: string): Promise<string> {
    if (typeof window === 'undefined') {
      throw new Error("Self Protocol can only be initialized on client side");
    }

    if (!userAddress) {
      throw new Error("User address is required for Self Protocol initialization");
    }

    try {
      // Create verification request
      const verificationRequest = {
        app_name: this.appName,
        scope: this.scope,
        user_id: userAddress,
        callback_url: window.location.origin + "/verification-callback",
        disclosures: {
          minimum_age: 18,
        },
        timestamp: Date.now(),
      };

      // Generate Self Protocol deep link
      const params = new URLSearchParams({
        request: btoa(JSON.stringify(verificationRequest)),
        version: "2"
      });

      return `self://verify?${params.toString()}`;
    } catch (error) {
      console.error("Failed to generate verification URL:", error);
      throw new Error(`Self Protocol URL generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if user is verified on blockchain
   */
  async checkUserVerification(
    userAddress: string,
    contractAddress: string,
    contractABI: string[]
  ): Promise<UserVerificationStatus> {
    if (!this.signer) {
      throw new Error("Signer not set. Please connect wallet first.");
    }

    if (!userAddress || !contractAddress || !contractABI) {
      throw new Error("Missing required parameters for verification check");
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, this.signer);
      
      const [isVerified, level, expiresAt] = await contract.isUserVerified(userAddress);
      
      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = Number(expiresAt) < currentTime;
      
      return {
        isVerified: Boolean(isVerified),
        verificationLevel: Number(level),
        expiresAt: Number(expiresAt),
        isExpired: isExpired
      };
    } catch (error) {
      console.error("Error checking user verification:", error);
      
      // Return default unverified state on error
      return {
        isVerified: false,
        verificationLevel: 0,
        expiresAt: 0,
        isExpired: true
      };
    }
  }

  /**
   * Get creator profile from blockchain
   */
  async getCreatorProfile(
    creatorAddress: string,
    contractAddress: string,
    contractABI: string[]
  ): Promise<CreatorProfile | null> {
    if (!this.signer) {
      throw new Error("Signer not set. Please connect wallet first.");
    }

    if (!creatorAddress || !contractAddress || !contractABI) {
      throw new Error("Missing required parameters for creator profile");
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, this.signer);
      
      const profile = await contract.getCreatorProfile(creatorAddress);
      
      return {
        isActive: Boolean(profile.isActive),
        totalNFTsCreated: Number(profile.totalNFTsCreated),
        totalSales: Number(profile.totalSales),
        reputationScore: Number(profile.reputationScore),
        joinedAt: Number(profile.joinedAt),
        lastActivityAt: Number(profile.lastActivityAt)
      };
    } catch (error) {
      console.error("Error getting creator profile:", error);
      return null;
    }
  }

  /**
   * Validate Self Protocol verification result
   */
  validateVerificationResult(result: any): boolean {
    if (!result || typeof result !== 'object') {
      return false;
    }

    // Check for required fields in verification result
    const requiredFields = ['proofHash', 'isMinimumAge'];
    for (const field of requiredFields) {
      if (!(field in result)) {
        console.warn(`Missing required field in verification result: ${field}`);
        return false;
      }
    }

    return true;
  }

  /**
   * Get verification expiry time (30 days from now)
   */
  getVerificationExpiry(): number {
    return Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // 30 days
  }
}

// Type definitions
export interface UserVerificationStatus {
  isVerified: boolean;
  verificationLevel: number;
  expiresAt: number;
  isExpired: boolean;
}

export interface CreatorProfile {
  isActive: boolean;
  totalNFTsCreated: number;
  totalSales: number;
  reputationScore: number;
  joinedAt: number;
  lastActivityAt: number;
}

export interface VerificationResult {
  isValid: boolean;
  userAddress?: string;
  disclosures?: {
    minimumAge?: boolean;
    nationality?: string;
    gender?: string;
  };
  proofHash?: string;
  verificationLevel?: number;
  error?: string;
}

// Export a singleton instance
export const selfProtocolService = new SelfProtocolService();
