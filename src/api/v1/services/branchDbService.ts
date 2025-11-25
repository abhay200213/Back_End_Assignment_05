// src/api/v1/services/branchDbService.ts

import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  FirestoreDocument,
} from "../repositories/firestoreRepository";
import { Branch } from "../models/branch";

const BRANCHES_COLLECTION = "branches";

export type NewBranch = Omit<Branch, "id">;

/**
 * Create a branch in Firestore.
 */
export async function createBranchDb(
  data: NewBranch
): Promise<FirestoreDocument<Branch>> {
  const id = await createDocument<Branch>(BRANCHES_COLLECTION, data);
  return {
    id,
    data: {
      id: Number.NaN,
      ...data,
    },
  };
}

/**
 * Get all branches from Firestore.
 */
export async function getAllBranchesDb(): Promise<FirestoreDocument<Branch>[]> {
  return getDocuments<Branch>(BRANCHES_COLLECTION);
}

/**
 * Get one branch by Firestore document ID.
 */
export async function getBranchByIdDb(
  id: string
): Promise<FirestoreDocument<Branch> | null> {
  return getDocumentById<Branch>(BRANCHES_COLLECTION, id);
}

/**
 * Update a branch document.
 */
export async function updateBranchDb(
  id: string,
  updates: Partial<NewBranch>
): Promise<void> {
  await updateDocument<Branch>(BRANCHES_COLLECTION, id, updates);
}

/**
 * Delete a branch document.
 */
export async function deleteBranchDb(id: string): Promise<void> {
  await deleteDocument(BRANCHES_COLLECTION, id);
}
