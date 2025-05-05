import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { FlowchartData } from '../../types';
import axios from 'axios';

interface ContractPreviewProps {
  flowchartData: FlowchartData;
  contractName?: string;
  contractDescription?: string;
}

export const ContractPreview: React.FC<ContractPreviewProps> = ({
  flowchartData,
  contractName = 'MyContract',
  contractDescription = 'A smart contract built with Sui flowchart builder.',
}) => {
  const [generatedCode, setGeneratedCode] = useState<string>('Generating contract...');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractCode = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post('http://localhost:8000/api/ai/generate-contract', {
          contractName,
          description: contractDescription,
          flowchartData,
        });

        if (response.data.code) {
          setGeneratedCode(response.data.code);
        } else {
          setGeneratedCode('// No code returned from AI');
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to generate contract.');
        setGeneratedCode('// Error generating contract');
      } finally {
        setLoading(false);
      }
    };

    if (flowchartData.nodes.length > 0) {
      fetchContractCode();
    } else {
      setGeneratedCode('// No flowchart data');
      setLoading(false);
    }
  }, [flowchartData, contractName, contractDescription]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">Generating code...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200">
            <code>{generatedCode}</code>
          </pre>
        )}
      </CardContent>
    </Card>
  );
};
