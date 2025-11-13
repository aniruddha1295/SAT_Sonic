// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SonicSelfVerification.sol";

/**
 * @title SonicIPToken
 * @dev ERC721 token for Sonic IP audio recordings with Self Protocol verification
 */
contract SonicIPToken is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    
    // Self Protocol verification contract
    SonicSelfVerification public immutable verificationContract;
    
    // Mapping from token ID to metadata hash
    mapping(uint256 => string) private _audioMetadata;
    
    // Mapping from token ID to creator verification status at mint time
    mapping(uint256 => bool) private _creatorVerifiedAtMint;
    
    // Events
    event AudioTokenized(uint256 indexed tokenId, address indexed creator, string metadataURI);

    constructor(address verificationContractAddress) ERC721("SonicIPToken", "SONIC") Ownable(msg.sender) {
        verificationContract = SonicSelfVerification(verificationContractAddress);
        _tokenIdCounter = 0;
    }

    /**
     * @dev Creates a new token for an audio recording (requires Self Protocol verification)
     * @param to The address that will own the minted token
     * @param metadataURI The IPFS URI for the token metadata
     * @param audioHash The IPFS hash of the audio file
     * @return The ID of the newly minted token
     */
    function mintAudioToken(
        address to,
        string memory metadataURI,
        string memory audioHash
    ) public returns (uint256) {
        // Require Self Protocol verification
        (bool isVerified, , ) = verificationContract.isUserVerified(to);
        require(isVerified, "SonicIPToken: Creator must be verified via Self Protocol");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // Record verification status at mint time
        _creatorVerifiedAtMint[tokenId] = true;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        _audioMetadata[tokenId] = audioHash;
        
        // Update creator stats in verification contract
        verificationContract.updateCreatorStats(to);
        
        emit AudioTokenized(tokenId, to, metadataURI);
        
        return tokenId;
    }
    
    /**
     * @dev Returns the audio metadata hash for a given token
     * @param tokenId The ID of the token
     * @return The IPFS hash of the audio file
     */
    function getAudioMetadata(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "SonicIPToken: Query for nonexistent token");
        return _audioMetadata[tokenId];
    }

    /**
     * @dev Verifies if an address owns the token for a specific audio hash
     * @param owner The address to check
     * @param audioHash The IPFS hash of the audio file
     * @return True if the address owns a token with the given audio hash
     */
    function verifyOwnership(address owner, string memory audioHash) public view returns (bool) {
        uint256 balance = balanceOf(owner);
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            if (keccak256(bytes(_audioMetadata[tokenId])) == keccak256(bytes(audioHash))) {
                return true;
            }
        }
        return false;
    }

    // Function to support enumeration
    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
        require(index < balanceOf(owner), "SonicIPToken: owner index out of bounds");
        uint256 count = 0;
        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (_exists(i) && ownerOf(i) == owner) {
                if (count == index) return i;
                count++;
            }
        }
        revert("SonicIPToken: owner index out of bounds");
    }

    /**
     * @dev Check if token was created by a verified creator
     * @param tokenId The token ID to check
     * @return True if creator was verified at mint time
     */
    function isTokenFromVerifiedCreator(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "SonicIPToken: Query for nonexistent token");
        return _creatorVerifiedAtMint[tokenId];
    }
    
    /**
     * @dev Get creator verification info for a token
     * @param tokenId The token ID to check
     * @return creator The original creator address
     * @return wasVerified Whether creator was verified at mint time
     * @return currentlyVerified Whether creator is currently verified
     */
    function getTokenVerificationInfo(uint256 tokenId) public view returns (
        address creator,
        bool wasVerified,
        bool currentlyVerified
    ) {
        require(_exists(tokenId), "SonicIPToken: Query for nonexistent token");
        
        // Get the original creator (first owner)
        creator = ownerOf(tokenId);
        wasVerified = _creatorVerifiedAtMint[tokenId];
        
        // Check current verification status
        (currentlyVerified, , ) = verificationContract.isUserVerified(creator);
        
        return (creator, wasVerified, currentlyVerified);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        try this.ownerOf(tokenId) returns (address) {
            return true;
        } catch {
            return false;
        }
    }
}