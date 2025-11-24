// src/api/v1/controllers/branchController.ts

import { Request, Response } from 'express';
import {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
  NewBranch
} from '../services/branchService';

export function handleGetAllBranches(req: Request, res: Response): void {
  const all = getAllBranches();
  res.status(200).json(all);
}

export function handleGetBranchById(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Invalid branch id parameter' });
    return;
  }

  const branch = getBranchById(id);

  if (!branch) {
    res.status(404).json({ message: 'Branch not found' });
    return;
  }

  res.status(200).json(branch);
}

export function handleCreateBranch(req: Request, res: Response): void {
  const { name, address, phone } = req.body as Partial<NewBranch>;

  if (!name || !address || !phone) {
    res.status(400).json({ message: 'Missing required branch fields' });
    return;
  }

  const newBranch = createBranch({ name, address, phone });

  res.status(201).json(newBranch);
}

export function handleUpdateBranch(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Invalid branch id parameter' });
    return;
  }

  const updates = req.body as Partial<NewBranch>;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ message: 'No fields provided for update' });
    return;
  }

  const updated = updateBranch(id, updates);

  if (!updated) {
    res.status(404).json({ message: 'Branch not found' });
    return;
  }

  res.status(200).json(updated);
}

export function handleDeleteBranch(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Invalid branch id parameter' });
    return;
  }

  const deleted = deleteBranch(id);

  if (!deleted) {
    res.status(404).json({ message: 'Branch not found' });
    return;
  }

  res.status(200).json({ message: 'Branch deleted successfully' });
}
