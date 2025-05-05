import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export const FunctionNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Function');
  
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
      className="group relative px-4 py-2 shadow-lg rounded-lg border-2 border-indigo-500 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-xl hover:scale-105"
      onDoubleClick={handleDoubleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 !bg-indigo-500 transition-all duration-200 hover:scale-125"
      />
      
      <div className="flex items-center">
        <div className="mr-2 rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 transition-colors group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800">
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
            className="text-indigo-600 dark:text-indigo-400"
          >
            <path d="M5 7l5 5-5 5"></path>
            <path d="M12 19h5"></path>
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
              className="p-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          ) : (
            <div className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {label}
            </div>
          )}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {data.parameters?.length 
              ? `Parameters: ${data.parameters.map(p => p.name).join(', ')}` 
              : 'No parameters'}
          </div>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 !bg-indigo-500 transition-all duration-200 hover:scale-125"
      />

      <div className="absolute -inset-px rounded-lg bg-indigo-100 dark:bg-indigo-900/30 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
    </div>
  );
};