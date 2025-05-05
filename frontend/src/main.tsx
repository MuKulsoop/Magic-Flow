import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css'; // important for UI
import { WalletContextProvider } from './context/WalletContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <WalletContextProvider>
      <App />
      </WalletContextProvider>
    </WalletProvider>
  </StrictMode>
);
