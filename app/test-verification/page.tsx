'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { SelfProtocolVerification } from '../../components/SelfProtocolVerification';
import { CONTRACT_ADDRESSES, SONIC_VERIFICATION_ABI } from '../../lib/contractConfig';

export default function TestVerificationPage() {
  const { address, isConnected } = useAccount();
  const [verificationResult, setVerificationResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string>("");

  const handleVerificationComplete = (result: unknown) => {
    console.log('Verification completed:', result);
    setVerificationResult(result as Record<string, unknown> | null);
    setError("");
  };

  const handleVerificationError = (errorMessage: string) => {
    console.error('Verification error:', errorMessage);
    setError(errorMessage);
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 Self Protocol Verification Test
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test the Self Protocol integration with your deployed smart contracts on Filecoin Calibration testnet.
          </p>
        </div>

        {/* Contract Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📋 Contract Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">SonicSelfVerification:</p>
              <p className="text-blue-600 font-mono break-all">
                {CONTRACT_ADDRESSES.SONIC_VERIFICATION}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">SonicIPToken:</p>
              <p className="text-blue-600 font-mono break-all">
                {CONTRACT_ADDRESSES.SONIC_IP_TOKEN}
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Network:</strong> Filecoin Calibration Testnet (Chain ID: 314159)
            </p>
          </div>
        </div>

        {/* Wallet Connection Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🔗 Wallet Connection</h2>
          {isConnected ? (
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-medium">Connected</span>
              <span className="text-gray-600 font-mono text-sm">{address}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-700 font-medium">Not Connected</span>
              <span className="text-gray-600">Please connect your wallet to continue</span>
            </div>
          )}
        </div>

        {/* Verification Component */}
        {isConnected ? (
          <div className="mb-8">
            <SelfProtocolVerification
              onVerificationComplete={handleVerificationComplete}
              onVerificationError={handleVerificationError}
              contractAddress={CONTRACT_ADDRESSES.SONIC_VERIFICATION}
              contractABI={SONIC_VERIFICATION_ABI}
            />
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800">
              Please connect your wallet to test Self Protocol verification
            </p>
          </div>
        )}

        {/* Results Display */}
        {verificationResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              ✅ Verification Successful!
            </h3>
            <pre className="text-sm text-green-700 bg-green-100 p-3 rounded overflow-auto">
              {JSON.stringify(verificationResult, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ❌ Verification Error
            </h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📖 Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Make sure your wallet is connected to <strong>Filecoin Calibration testnet</strong></li>
            <li>Ensure you have some testnet FIL for gas fees</li>
            <li>Download the <strong>Self app</strong> on your mobile device</li>
            <li>Follow the verification flow by scanning the QR code</li>
            <li>Complete identity verification using your passport</li>
            <li>Check the results displayed above</li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">📱 Self App Download:</h3>
            <p className="text-blue-700 text-sm">
              Search for "Self" in your mobile app store or visit the Self Protocol website for download links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
