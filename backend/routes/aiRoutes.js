// routes/aiRoutes.js
import express from 'express';
import { generateMoveContract } from '../utils/genrateContract.js';

const router = express.Router();

router.post('/generate-contract', async (req, res) => {
  const { flowchartData, contractName, description } = req.body;

  try {
    const code = await generateMoveContract(flowchartData, contractName, description);
    res.json({ code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
