import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { WalletConnect } from '../components/wallet/WalletConnect';
import { Contract } from '../types';
import { ArrowLeft, Check, CheckCircle, AlertCircle } from 'lucide-react';
import { useWallet } from '@suiet/wallet-kit';


export const DeployPage: React.FC = () => {
  const navigate = useNavigate();
  const { signAndExecuteTransactionBlock } = useWallet();
  
  const [deploymentStep, setDeploymentStep] = useState<'connect-wallet' | 'confirm' | 'deploying' | 'success' | 'error'>('connect-wallet');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);
  const [deployedContract, setDeployedContract] = useState<Contract | null>(null);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setDeploymentStep('confirm');
  };

  const handleDeploy = async () => {
    setDeploymentStep('deploying');

    try {
      // // 1. Build the transaction block to deploy the Move package
      // const txb = new TransactionBlock();

      // // Replace with actual bytecode & metadata of your Move package
      // const compiledModules = [
      //   // Your compiled Move bytecode in Uint8Array format (use your compiled .mv files here)
      // ];
      // const dependencies = [
      //   // SUI module dependencies, e.g., ["0x2", "0x3"]
      // ];

      // // Add the Move package to the transaction block
      // txb.publish({
      //   modules: compiledModules,
      //   dependencies: dependencies,
      // });

      // // 2. Sign and execute the transaction
      // const result = await signAndExecuteTransactionBlock({
      //   transactionBlock: txb,
      //   options: {
      //     showEffects: true,
      //     showEvents: true,
      //   },
      // });

      // // 3. Handle success
      // const txDigest = result.digest;
      // const deployedPackageId = result.effects?.created?.find(obj => obj.owner === 'Immutable')?.reference?.objectId;

      // const contract: Contract = {
      //   id: Math.random().toString(36).substring(2, 9),
      //   name: 'NFT Collection',
      //   description: 'A smart contract for creating and managing NFT collections on SUI.',
      //   ownerId: walletAddress || '1',
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      //   flowchartData: { nodes: [], edges: [] }, // (You can replace this with actual flowchart data)
      //   deploymentStatus: 'deployed',
      //   deploymentHash: txDigest,
      // };

      // setDeployedContract(contract);
      setDeploymentStep('success');
    } catch (error: any) {
      console.error('Deployment failed:', error);
      setDeploymentError(error.message || 'Deployment failed');
      setDeploymentStep('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Deploy Smart Contract"
        description="Deploy your smart contract to the SUI blockchain."
        action={
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/builder')}
          >
            Back to Builder
          </Button>
        }
      />
      
      <div className="max-w-3xl mx-auto">
        {deploymentStep === 'connect-wallet' && (
          <WalletConnect onConnect={handleWalletConnect} />
        )}
        
        {deploymentStep === 'confirm' && walletAddress && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Connected Wallet
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                    {walletAddress}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Network
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    SUI Mainnet
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Estimated Gas Fee
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    0.01 SUI
                  </p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Once deployed, your smart contract cannot be modified. Make sure everything is correct before proceeding.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setDeploymentStep('connect-wallet')}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDeploy}
              >
                Deploy Contract
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {deploymentStep === 'deploying' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                  Deploying Your Contract
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This may take a few moments. Please do not close this page.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {deploymentStep === 'success' && deployedContract && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="rounded-full h-16 w-16 flex items-center justify-center bg-green-100 dark:bg-green-900 mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                  Contract Deployed Successfully!
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Your smart contract has been deployed to the SUI blockchain.
                </p>
                
                <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contract Hash
                  </p>
                  <p className="mt-1 text-sm font-mono text-gray-500 dark:text-gray-400 break-all">
                    {deployedContract.deploymentHash}
                  </p>
                </div>
                
                <div className="mt-8 space-y-4">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate('/portfolio')}
                  >
                    View My Contracts
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/builder')}
                  >
                    Create Another Contract
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {deploymentStep === 'error' && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="rounded-full h-16 w-16 flex items-center justify-center bg-red-100 dark:bg-red-900 mx-auto">
                  <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                  Deployment Failed
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {deploymentError || 'An unexpected error occurred during deployment.'}
                </p>
                
                <div className="mt-8 space-y-4">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => setDeploymentStep('confirm')}
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/builder')}
                  >
                    Back to Builder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
