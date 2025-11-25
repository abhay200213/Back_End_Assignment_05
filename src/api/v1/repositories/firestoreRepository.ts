// src/api/v1/repositories/firestoreRepository.ts

import { db } from "../../../../config/firebaseConfig";

// A generic helper type for Firestore documents
export interface FirestoreDocument<T> {
  id: string;
  data: T;
}

/**
 * Create a document in the given collection.
 * Returns the new document ID.
 */
export async function createDocument<T>(
  collectionName: string,
  data: T
): Promise<string> {
  const collectionRef: any = (db as any).collection(collectionName);

  // In real Firestore, this would be: const docRef = await collectionRef.add(data);
  const docRef = await collectionRef.add(data);
  return docRef.id as string;
}

/**
 * Get all documents from a collection.
 */
export async function getDocuments<T>(
  collectionName: string
): Promise<FirestoreDocument<T>[]> {
  const collectionRef: any = (db as any).collection(collectionName);
  const snapshot = await collectionRef.get();

  const docs: FirestoreDocument<T>[] = [];
  snapshot.forEach((doc: any) => {
    docs.push({
      id: doc.id,
      data: doc.data() as T,
    });
  });

  return docs;
}

/**
 * Get a single document by ID.
 * Returns null if document does not exist.
 */
export async function getDocumentById<T>(
  collectionName: string,
  id: string
): Promise<FirestoreDocument<T> | null> {
  const collectionRef: any = (db as any).collection(collectionName);
  const docRef = collectionRef.doc(id);
  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    data: snapshot.data() as T,
  };
}

/**
 * Update a document by ID with a partial update.
 */
export async function updateDocument<T>(
  collectionName: string,
  id: string,
  updateData: Partial<T>
): Promise<void> {
  const collectionRef: any = (db as any).collection(collectionName);
  const docRef = collectionRef.doc(id);
  await docRef.update(updateData);
}

/**
 * Delete a document by ID.
 */
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  const collectionRef: any = (db as any).collection(collectionName);
  const docRef = collectionRef.doc(id);
  await docRef.delete();
}
