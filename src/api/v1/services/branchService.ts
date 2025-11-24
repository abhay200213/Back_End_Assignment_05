// src/api/v1/services/branchService.ts

import { branches, Branch } from '../../../data/branches';

export type NewBranch = Omit<Branch, 'id'>;

let nextBranchId = branches.length + 1;

export function getAllBranches(): Branch[] {
  return branches;
}

export function getBranchById(id: number): Branch | undefined {
  return branches.find((b) => b.id === id);
}

export function createBranch(data: NewBranch): Branch {
  const newBranch: Branch = {
    id: nextBranchId++,
    ...data
  };

  branches.push(newBranch);
  return newBranch;
}

export function updateBranch(
  id: number,
  updates: Partial<NewBranch>
): Branch | null {
  const index = branches.findIndex((b) => b.id === id);
  if (index === -1) {
    return null;
  }

  branches[index] = {
    ...branches[index],
    ...updates
  };

  return branches[index];
}

export function deleteBranch(id: number): boolean {
  const index = branches.findIndex((b) => b.id === id);
  if (index === -1) {
    return false;
  }

  branches.splice(index, 1);
  return true;
}
