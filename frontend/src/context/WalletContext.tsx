// context/WalletContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useWallet } from '@suiet/wallet-kit';

interface WalletContextType {
  walletAddress: string | null;
  connected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { connected, account } = useWallet();

  return (
    <WalletContext.Provider value={{
      walletAddress: account?.address || null,
      connected
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within WalletContextProvider');
  }
  return context;
};
