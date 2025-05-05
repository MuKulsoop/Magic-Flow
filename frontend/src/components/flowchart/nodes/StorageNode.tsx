import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export const StorageNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Storage');
  
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  
  const handleBlur = () => {
    setIsEditing(false);
    data.label = label;
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      data.label = label;
    }
  };

  return (
    <div 
      className="group relative px-4 py-2 shadow-lg rounded-lg border-2 border-blue-500 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-xl hover:scale-105"
      onDoubleClick={handleDoubleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 !bg-blue-500 transition-all duration-200 hover:scale-125"
      />
      
      <div className="flex items-center">
        <div className="mr-2 rounded-full w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-800">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-blue-600 dark:text-blue-400"
          >
            <path d="M22 12H2"></path>
            <path d="M5 12V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7"></path>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"></path>
          </svg>
        </div>
        <div>
          {isEditing ? (
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="p-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {label}
            </div>
          )}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {data.parameters?.length 
              ? `Fields: ${data.parameters.map(p => p.name).join(', ')}` 
              : 'No fields defined'}
          </div>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 !bg-blue-500 transition-all duration-200 hover:scale-125"
      />

      <div className="absolute -inset-px rounded-lg bg-blue-100 dark:bg-blue-900/30 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
    </div>
  );
};