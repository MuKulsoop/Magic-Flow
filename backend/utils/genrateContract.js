import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = 'You are a professional Move smart contract developer. Always follow Move syntax strictly and ensure the generated code is modular, scalable, and deployable. Avoid adding unnecessary explanations in the output.'

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction,
});

const generationConfig = {
  temperature: 0.4,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 3000,
};

/**
 * Generate Move smart contract from flowchart data
 * @param {Object} flowchartData - The raw flowchart data from frontend
 * @param {string} contractName - Name of the contract
 * @param {string} description - Description of what the contract should do
 * @returns {Promise<string>} - Generated Move smart contract code
 */
export async function generateMoveContract(flowchartData, contractName, description) {
  const prompt = `
You are an AI smart contract developer. Convert the following flowchart into a complete and syntactically correct Move smart contract.

Contract Name: ${contractName}

Description: ${description}

Flowchart Nodes:
${JSON.stringify(flowchartData.nodes, null, 2)}

Flowchart Edges:
${JSON.stringify(flowchartData.edges, null, 2)}

Your job is to:
- Translate the logic into a valid Move smart contract.
- Include appropriate module definitions, structs, storage if any.
- Use the function nodes to implement functions with logic.
- Represent events, conditions, inputs, and outputs accordingly.
- Do not include any extra text or explanation. Only output the full Move code.
`;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating Move contract:', error);
    throw new Error('Failed to generate Move contract');
  }
}

