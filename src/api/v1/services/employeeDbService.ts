// src/api/v1/services/employeeDbService.ts

import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  FirestoreDocument,
} from "../repositories/firestoreRepository";
import { Employee } from "../models/employee";

const EMPLOYEES_COLLECTION = "employees";

export type NewEmployee = Omit<Employee, "id">;

/**
 * Create an employee in Firestore.
 */
export async function createEmployeeDb(
  data: NewEmployee
): Promise<FirestoreDocument<Employee>> {
  const id = await createDocument<Employee>(EMPLOYEES_COLLECTION, data);
  return {
    id,
    data: {
      id: Number.NaN, // Firestore will not store numeric ID like our in-memory one; kept for compatibility
      ...data,
    },
  };
}

/**
 * Get all employees from Firestore.
 */
export async function getAllEmployeesDb(): Promise<FirestoreDocument<Employee>[]> {
  return getDocuments<Employee>(EMPLOYEES_COLLECTION);
}

/**
 * Get one employee by Firestore document ID.
 */
export async function getEmployeeByIdDb(
  id: string
): Promise<FirestoreDocument<Employee> | null> {
  return getDocumentById<Employee>(EMPLOYEES_COLLECTION, id);
}

/**
 * Update an employee document.
 */
export async function updateEmployeeDb(
  id: string,
  updates: Partial<NewEmployee>
): Promise<void> {
  await updateDocument<Employee>(EMPLOYEES_COLLECTION, id, updates);
}

/**
 * Delete an employee document.
 */
export async function deleteEmployeeDb(id: string): Promise<void> {
  await deleteDocument(EMPLOYEES_COLLECTION, id);
}
