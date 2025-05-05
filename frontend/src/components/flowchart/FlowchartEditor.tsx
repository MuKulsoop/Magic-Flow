import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '../ui/Button';
import { Plus, Trash, Save, Code } from 'lucide-react';
import { FunctionNode } from './nodes/FunctionNode';
import { ConditionNode } from './nodes/ConditionNode';
import { StorageNode } from './nodes/StorageNode';
import { FlowchartData } from '../../types';

const nodeTypes: NodeTypes = {
  function: FunctionNode,
  condition: ConditionNode,
  storage: StorageNode,
};

interface FlowchartEditorProps {
  initialData?: FlowchartData;
  onSave?: (data: FlowchartData) => void;
  readOnly?: boolean;
}

export const FlowchartEditor: React.FC<FlowchartEditorProps> = ({
  initialData,
  onSave,
  readOnly = false,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData?.edges || []);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 }
      }, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const onBackgroundClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const handleAddNode = (type: 'function' | 'condition' | 'storage') => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 250, y: 250 },
      data: {
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        parameters: [],
      },
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  const handleDeleteSelected = () => {
    if (selectedNode) {
      setNodes((nodes) => nodes.filter((node) => node.id !== selectedNode.id));
      setEdges((edges) => edges.filter(
        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
      ));
      setSelectedNode(null);
    }
    if (selectedEdge) {
      setEdges((edges) => edges.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ nodes, edges });
    }
  };

  const edgeOptions = {
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: '#6366f1',
      strokeWidth: 2,
    },
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          <Code className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Smart Contract Builder
        </h3>
        <div className="flex space-x-2">
          {!readOnly && (
            <>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus size={16} />}
                onClick={() => handleAddNode('function')}
                className="bg-white dark:bg-gray-800"
              >
                Function
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus size={16} />}
                onClick={() => handleAddNode('condition')}
                className="bg-white dark:bg-gray-800"
              >
                Condition
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus size={16} />}
                onClick={() => handleAddNode('storage')}
                className="bg-white dark:bg-gray-800"
              >
                Storage
              </Button>
              {(selectedNode || selectedEdge) && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Trash size={16} />}
                  onClick={handleDeleteSelected}
                  className="bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  Delete
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Save size={16} />}
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex-grow relative">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onBackgroundClick}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={edgeOptions}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            elementsSelectable={!readOnly}
            nodesDraggable={!readOnly}
            nodesConnectable={!readOnly}
            edgesFocusable={!readOnly}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          >
            <Controls className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg" />
            <Background
              color="#94a3b8"
              gap={16}
              size={1}
              className="dark:bg-gray-900/50"
            />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};