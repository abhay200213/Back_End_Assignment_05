// src/api/v1/routes/branchRoutes.ts

import { Router } from 'express';
import {
  handleGetAllBranches,
  handleGetBranchById,
  handleCreateBranch,
  handleUpdateBranch,
  handleDeleteBranch
} from '../controllers/branchController';

export const branchRouter = Router();

// Create Branch
branchRouter.post('/', handleCreateBranch);

// Get All Branches
branchRouter.get('/', handleGetAllBranches);

// Get Branch by ID
branchRouter.get('/:id', handleGetBranchById);

// Update Branch
branchRouter.put('/:id', handleUpdateBranch);

// Delete Branch
branchRouter.delete('/:id', handleDeleteBranch);
