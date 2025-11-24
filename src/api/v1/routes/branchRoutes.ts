// src/api/v1/routes/branchRoutes.ts

import { Router } from 'express';
import { validateBody } from "../middleware/validationMiddleware";
import { createBranchSchema, updateBranchSchema } from "../validation/branchValidation";

import {
  handleGetAllBranches,
  handleGetBranchById,
  handleCreateBranch,
  handleUpdateBranch,
  handleDeleteBranch
} from '../controllers/branchController';

export const branchRouter = Router();

// CREATE Branch (validated)
branchRouter.post(
  '/',
  validateBody(createBranchSchema),
  handleCreateBranch
);

// GET all branches
branchRouter.get('/', handleGetAllBranches);

// GET branch by ID
branchRouter.get('/:id', handleGetBranchById);

// UPDATE Branch (validated)
branchRouter.put(
  '/:id',
  validateBody(updateBranchSchema),
  handleUpdateBranch
);

// DELETE Branch
branchRouter.delete('/:id', handleDeleteBranch);
