import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { ContractCard } from '../components/contract/ContractCard';
import { mockContracts } from './utils/mockData';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PortfolioPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [contracts] = useState(mockContracts);
  const [filter, setFilter] = useState<'all' | 'deployed' | 'draft'>('all');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const filteredContracts = contracts.filter(contract => {
    if (filter === 'all') return true;
    return contract.deploymentStatus === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="My Smart Contracts"
        description="Manage your created and deployed smart contracts."
        action={
          <Button 
            variant="primary" 
            leftIcon={<Plus size={16} />}
            onClick={() => navigate('/builder')}
          >
            Create New Contract
          </Button>
        }
      />

      <div className="mb-6">
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'all'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setFilter('all')}
          >
            All Contracts
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'deployed'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setFilter('deployed')}
          >
            Deployed
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'draft'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setFilter('draft')}
          >
            Drafts
          </button>
        </div>
      </div>

      {filteredContracts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No contracts found</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {filter === 'all' 
              ? "You haven't created any contracts yet." 
              : `You don't have any ${filter} contracts.`}
          </p>
          <div className="mt-6">
            <Button 
              variant="primary"
              onClick={() => navigate('/builder')}
              leftIcon={<Plus size={16} />}
            >
              Create your first contract
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      )}
    </div>
  );
};