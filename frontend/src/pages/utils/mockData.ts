import { Contract, ContractTemplate } from '../../types';

// Mock contracts for the portfolio page
export const mockContracts: Contract[] = [
  {
    id: '1',
    name: 'NFT Collection',
    description: 'A smart contract for creating and managing NFT collections on SUI.',
    ownerId: '1',
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-18T14:30:00Z',
    flowchartData: {
      nodes: [
        {
          id: 'function-1',
          type: 'function',
          position: { x: 250, y: 100 },
          data: {
            label: 'Mint NFT',
            parameters: [
              { name: 'name', type: 'String' },
              { name: 'description', type: 'String' },
              { name: 'url', type: 'String' },
            ],
          },
        },
        {
          id: 'storage-1',
          type: 'storage',
          position: { x: 250, y: 250 },
          data: {
            label: 'NFT',
            parameters: [
              { name: 'id', type: 'UID' },
              { name: 'name', type: 'String' },
              { name: 'description', type: 'String' },
              { name: 'url', type: 'String' },
              { name: 'creator', type: 'address' },
            ],
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'function-1',
          target: 'storage-1',
          type: 'default',
        },
      ],
    },
    deploymentStatus: 'deployed',
    deploymentHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  {
    id: '2',
    name: 'Token Sale',
    description: 'A contract for managing token sales and ICOs.',
    ownerId: '1',
    createdAt: '2025-03-10T08:15:00Z',
    updatedAt: '2025-03-17T11:45:00Z',
    flowchartData: {
      nodes: [
        {
          id: 'function-1',
          type: 'function',
          position: { x: 250, y: 100 },
          data: {
            label: 'Buy Tokens',
            parameters: [
              { name: 'amount', type: 'u64' },
            ],
          },
        },
      ],
      edges: [],
    },
    deploymentStatus: 'draft',
  },
  {
    id: '3',
    name: 'Voting System',
    description: 'A decentralized voting system for DAOs and organizations.',
    ownerId: '1',
    createdAt: '2025-02-20T15:30:00Z',
    updatedAt: '2025-03-16T09:20:00Z',
    flowchartData: {
      nodes: [],
      edges: [],
    },
    deploymentStatus: 'failed',
  },
];

// Mock templates for the builder page
export const mockTemplates: ContractTemplate[] = [
  {
    id: '1',
    name: 'NFT Collection',
    description: 'Create and manage NFT collections on SUI blockchain.',
    category: 'NFTs',
    previewImage: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg',
    flowchartData: {
      nodes: [
        {
          id: 'function-1',
          type: 'function',
          position: { x: 250, y: 100 },
          data: {
            label: 'Mint NFT',
            parameters: [
              { name: 'name', type: 'String' },
              { name: 'description', type: 'String' },
              { name: 'url', type: 'String' },
            ],
          },
        },
        {
          id: 'storage-1',
          type: 'storage',
          position: { x: 250, y: 250 },
          data: {
            label: 'NFT',
            parameters: [
              { name: 'id', type: 'UID' },
              { name: 'name', type: 'String' },
              { name: 'description', type: 'String' },
              { name: 'url', type: 'String' },
              { name: 'creator', type: 'address' },
            ],
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'function-1',
          target: 'storage-1',
          type: 'default',
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Token Sale',
    description: 'Set up a token sale or ICO for your project.',
    category: 'Tokens',
    previewImage: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
    flowchartData: {
      nodes: [
        {
          id: 'function-1',
          type: 'function',
          position: { x: 250, y: 100 },
          data: {
            label: 'Create Token',
            parameters: [
              { name: 'name', type: 'String' },
              { name: 'symbol', type: 'String' },
              { name: 'decimals', type: 'u8' },
              { name: 'supply', type: 'u64' },
            ],
          },
        },
        {
          id: 'function-2',
          type: 'function',
          position: { x: 100, y: 250 },
          data: {
            label: 'Buy Tokens',
            parameters: [
              { name: 'amount', type: 'u64' },
            ],
          },
        },
        {
          id: 'function-3',
          type: 'function',
          position: { x: 400, y: 250 },
          data: {
            label: 'Withdraw Funds',
            parameters: [],
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'function-1',
          target: 'function-2',
          type: 'default',
        },
        {
          id: 'edge-2',
          source: 'function-1',
          target: 'function-3',
          type: 'default',
        },
      ],
    },
  },
  {
    id: '3',
    name: 'DAO Voting',
    description: 'Create a decentralized autonomous organization with voting capabilities.',
    category: 'Governance',
    previewImage: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg',
    flowchartData: {
      nodes: [
        {
          id: 'function-1',
          type: 'function',
          position: { x: 250, y: 100 },
          data: {
            label: 'Create Proposal',
            parameters: [
              { name: 'title', type: 'String' },
              { name: 'description', type: 'String' },
              { name: 'votingPeriod', type: 'u64' },
            ],
          },
        },
        {
          id: 'function-2',
          type: 'function',
          position: { x: 250, y: 250 },
          data: {
            label: 'Vote',
            parameters: [
              { name: 'proposalId', type: 'ID' },
              { name: 'support', type: 'bool' },
            ],
          },
        },
        {
          id: 'function-3',
          type: 'function',
          position: { x: 250, y: 400 },
          data: {
            label: 'Execute Proposal',
            parameters: [
              { name: 'proposalId', type: 'ID' },
            ],
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'function-1',
          target: 'function-2',
          type: 'default',
        },
        {
          id: 'edge-2',
          source: 'function-2',
          target: 'function-3',
          type: 'default',
        },
      ],
    },
  },
  {
    id: '4',
    name: 'Marketplace',
    description: 'Build a decentralized marketplace for digital assets.',
    category: 'Commerce',
    previewImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    flowchartData: {
      nodes: [],
      edges: [],
    },
  },
];