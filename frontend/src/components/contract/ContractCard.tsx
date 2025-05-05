import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import { Contract } from '../../types';
import { Eye, Edit, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

interface ContractCardProps {
  contract: Contract;
}

export const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  const statusColor = {
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    deployed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {contract.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {contract.description || 'No description'}
            </p>
            <div className="mt-2 flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[contract.deploymentStatus]}`}>
                {contract.deploymentStatus.charAt(0).toUpperCase() + contract.deploymentStatus.slice(1)}
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                Updated {new Date(contract.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-3">
          <Link to={`/builder/${contract.id}`}>
            <Button variant="outline" size="sm" leftIcon={<Edit size={14} />}>
              Edit
            </Button>
          </Link>
          <Link to={`/contract/${contract.id}`}>
            <Button variant="outline" size="sm" leftIcon={<Eye size={14} />}>
              View
            </Button>
          </Link>
          {contract.deploymentStatus === 'deployed' && contract.deploymentHash && (
            <a 
              href={`https://explorer.sui.io/txblock/${contract.deploymentHash}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" leftIcon={<ExternalLink size={14} />}>
                Explorer
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};