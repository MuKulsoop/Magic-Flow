import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardContent } from '../components/ui/Card';

export const DocumentationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Documentation"
        description="Learn how to use the SUIBuilder platform."
      />
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Getting Started</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              SUIBuilder allows you to create smart contracts for the SUI blockchain without writing any code. 
              This guide will help you understand how to use our platform effectively.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Creating Your First Contract</h3>
            <ol className="list-decimal pl-6 space-y-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Sign up or Log in</strong> - Create an account or log in to your existing account.
              </li>
              <li>
                <strong>Select a Template</strong> - Choose from our pre-built templates or start from scratch.
              </li>
              <li>
                <strong>Use the Builder</strong> - Customize your contract using our visual flowchart interface.
              </li>
              <li>
                <strong>Deploy Your Contract</strong> - Connect your wallet and deploy your contract to the SUI blockchain.
              </li>
            </ol>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Using the Flowchart Builder</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Node Types</h3>
            <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Function Nodes</strong> - Represent contract functions that can be called by users.
              </li>
              <li>
                <strong>Condition Nodes</strong> - Create branching logic based on conditions.
              </li>
              <li>
                <strong>Storage Nodes</strong> - Define data structures to store on-chain.
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Building Your Flowchart</h3>
            <ol className="list-decimal pl-6 space-y-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Add Nodes</strong> - Click on the function, condition, or storage buttons to add them to your flowchart.
              </li>
              <li>
                <strong>Connect Nodes</strong> - Click and drag from a node's output handle to another node's input handle to create connections.
              </li>
              <li>
                <strong>Edit Properties</strong> - Double-click on a node to edit its properties, such as function names and parameters.
              </li>
              <li>
                <strong>Delete Elements</strong> - Select a node or connection and click the delete button to remove it.
              </li>
            </ol>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Deploying Contracts</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Deployment Process</h3>
            <ol className="list-decimal pl-6 space-y-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Connect Your Wallet</strong> - Connect your SUI-compatible wallet to authenticate and pay for deployment.
              </li>
              <li>
                <strong>Review Contract Details</strong> - Verify the contract details, including gas fees.
              </li>
              <li>
                <strong>Confirm Deployment</strong> - Approve the transaction in your wallet.
              </li>
              <li>
                <strong>Wait for Confirmation</strong> - Your contract will be deployed to the SUI blockchain. This may take a few moments.
              </li>
            </ol>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">After Deployment</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Once your contract is deployed, you'll receive a contract address and transaction hash. You can view your contract on the SUI Explorer and interact with it through your dApp or the SUI wallet.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Note:</strong> Deployed contracts cannot be modified due to the immutable nature of blockchain technology. Make sure your contract is correct before deploying.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">What is SUI?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  SUI is a layer-1 blockchain that's designed to enable creators and developers to build experiences that cater to the next billion users in web3.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Do I need to know how to code?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No! SUIBuilder is designed for users with little to no coding experience. Our visual interface allows you to create smart contracts without writing any code.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">What wallet can I use?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You can use any SUI-compatible wallet, such as SUI Wallet, Ethos Wallet, or other supported wallets.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">How much does it cost to deploy a contract?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Deployment costs vary depending on the complexity of your contract. You'll need to pay gas fees in SUI to deploy your contract to the blockchain.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};