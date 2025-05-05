export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Contract {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  flowchartData: FlowchartData;
  deploymentStatus: 'draft' | 'deployed' | 'failed';
  deploymentHash?: string;
}

export interface FlowchartNode {
  id: string;
  type: 'function' | 'condition' | 'storage' | 'event' | 'input' | 'output';
  position: { x: number; y: number };
  data: {
    label: string;
    code?: string;
    parameters?: { name: string; type: string; value?: string }[];
    returnType?: string;
  };
}

export interface FlowchartEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'default' | 'conditional';
}

export interface FlowchartData {
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
}

export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  flowchartData: FlowchartData;
  previewImage?: string;
}

export interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}
