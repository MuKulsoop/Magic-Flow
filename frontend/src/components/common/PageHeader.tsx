import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">{title}</h1>
          {description && (
            <p className="mt-2 max-w-4xl text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};