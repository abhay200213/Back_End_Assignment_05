// src/api/v1/routes/employeeRoutes.ts

import { Router } from 'express';
import { validateBody } from "../../middleware/validationMiddleware";
import { createEmployeeSchema, updateEmployeeSchema } from "../../validation/employeeValidation";
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

// CREATE employee (validated)
employeeRouter.post(
  '/',
  validateBody(createEmployeeSchema),
  handleCreateEmployee
);

// GET all employees
employeeRouter.get('/', handleGetAllEmployees);

// Logical filters
employeeRouter.get('/by-branch', handleGetEmployeesByBranch);
employeeRouter.get('/by-department', handleGetEmployeesByDepartment);

// GET employee by ID
employeeRouter.get('/:id', handleGetEmployeeById);

// UPDATE employee (validated)
employeeRouter.put(
  '/:id',
  validateBody(updateEmployeeSchema),
  handleUpdateEmployee
);

// DELETE employee
employeeRouter.delete('/:id', handleDeleteEmployee);
