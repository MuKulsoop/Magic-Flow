import express from 'express';
import { deployMoveContract } from '../utils/deployMove.js';

const router = express.Router();

router.post('/deploy-contract', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: 'Code is required' });
  }

  try {
    const result = await deployMoveContract(code);
    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
