// src/api/v1/routes/employeeRoutes.ts

import { Router } from 'express';
import {
  handleGetAllEmployees,
  handleGetEmployeeById,
  handleCreateEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleGetEmployeesByBranch,
  handleGetEmployeesByDepartment
} from '../controllers/employeeController';

export const employeeRouter = Router();

// Create Employee
employeeRouter.post('/', handleCreateEmployee);

// Get All Employees
employeeRouter.get('/', handleGetAllEmployees);

// Logical operations
employeeRouter.get('/by-branch', handleGetEmployeesByBranch);
employeeRouter.get('/by-department', handleGetEmployeesByDepartment);

// Get Employee by ID
employeeRouter.get('/:id', handleGetEmployeeById);

// Update Employee
employeeRouter.put('/:id', handleUpdateEmployee);

// Delete Employee
employeeRouter.delete('/:id', handleDeleteEmployee);
