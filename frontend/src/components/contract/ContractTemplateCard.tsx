import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ContractTemplate } from '../../types';
import { Button } from '../ui/Button';

interface ContractTemplateCardProps {
  template: ContractTemplate;
  onSelect: (template: ContractTemplate) => void;
}

export const ContractTemplateCard: React.FC<ContractTemplateCardProps> = ({ 
  template, 
  onSelect 
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 overflow-hidden">
          {template.previewImage ? (
            <img 
              src={template.previewImage} 
              alt={template.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {template.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {template.description}
        </p>
        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
            {template.category}
          </span>
        </div>

        <div className="mt-4">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={() => onSelect(template)}
          >
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};