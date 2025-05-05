import express from 'express';
import {
  createContract,
  getUserContracts,
  getContractById,
  updateContract,
  deleteContract,
} from '../controllers/contract.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a new contract
router.post('/', protect, createContract);

// Get all contracts of logged-in user
router.get('/', protect, getUserContracts);

// Get a specific contract by ID
router.get('/:id', protect, getContractById);

// Update a specific contract by ID
router.put('/:id', protect, updateContract);

// Delete a specific contract by ID
router.delete('/:id', protect, deleteContract);

export default router;
