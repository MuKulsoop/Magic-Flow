import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export const ConditionNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Condition');
  
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
      className="group relative px-4 py-2 shadow-lg rounded-lg border-2 border-yellow-500 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-xl hover:scale-105"
      onDoubleClick={handleDoubleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 !bg-yellow-500 transition-all duration-200 hover:scale-125"
      />
      
      <div className="flex items-center">
        <div className="mr-2 rounded-full w-8 h-8 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 transition-colors group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800">
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
            className="text-yellow-600 dark:text-yellow-400"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
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
              className="p-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          ) : (
            <div className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              {label}
            </div>
          )}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {data.parameters?.length 
              ? `Condition: ${data.parameters.map(p => p.name).join(', ')}` 
              : 'Boolean condition'}
          </div>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        className="w-3 h-3 !bg-green-500 transition-all duration-200 hover:scale-125"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        className="w-3 h-3 !bg-red-500 transition-all duration-200 hover:scale-125"
      />

      <div className="absolute -inset-px rounded-lg bg-yellow-100 dark:bg-yellow-900/30 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
    </div>
  );
};