import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Wallet, Loader } from 'lucide-react';
import { useWallet } from '@suiet/wallet-kit';
import { useWalletContext } from '../../context/WalletContext'; // adjust this path if needed
import { ConnectButton } from '@suiet/wallet-kit';

export const WalletConnect: React.FC<{
  onConnect: (walletAddress: string) => void;
}> = ({ onConnect }) => {
  const [error, setError] = useState<string | null>(null);
  const {
    account,
    connected,
    connecting,
    select,
    configuredWallets,
  } = useWallet();

  const { walletAddress } = useWalletContext();

  const handleConnect = async () => {
    setError(null);

    try {
      if (!connected && configuredWallets.length > 0) {
        // Select the Suiet wallet (or any available wallet)
        const walletToUse = configuredWallets.find((w) => w.name === 'Suiet') || configuredWallets[0];
        if (!walletToUse) throw new Error('No configured wallets found.');

        await select(walletToUse.name);
      }
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError('Failed to connect wallet. Please try again.');
    }
  };

  useEffect(() => {
    if (connected && walletAddress) {
      onConnect(walletAddress);
    }
  }, [connected, walletAddress, onConnect]);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect Your Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          <div className="mb-4 bg-indigo-100 dark:bg-indigo-900 p-4 rounded-full inline-flex items-center justify-center">
            <Wallet className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect your SUI wallet to deploy your smart contract to the blockchain.
          </p>
          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm mb-4 p-3 bg-red-50 dark:bg-red-900/50 rounded-md">
              {error}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <ConnectButton />
      </CardFooter>
    </Card>
  );
};
