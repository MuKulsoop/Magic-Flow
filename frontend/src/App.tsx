import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { BuilderPage } from './pages/BuilderPage';
import { DeployPage } from './pages/DeployPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { ConnectButton } from '@suiet/wallet-kit';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="absolute top-4 right-4 z-50">
              <ConnectButton />
            </div>
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/builder" element={<BuilderPage />} />
                <Route path="/builder/:id" element={<BuilderPage />} />
                <Route path="/deploy" element={<DeployPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
