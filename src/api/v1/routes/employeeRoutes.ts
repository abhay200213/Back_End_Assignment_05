// src/api/v1/routes/employeeRoutes.ts

import { Router } from 'express';
import { validateBody } from "../middleware/validationMiddleware";
import { createEmployeeSchema, updateEmployeeSchema } from "../validation/employeeValidation";
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

/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeCreate'
 *     responses:
 *       201:
 *         description: Employee successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Validation error.
 */
employeeRouter.post(
  '/',
  validateBody(createEmployeeSchema),
  handleCreateEmployee
);

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: List of all employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
employeeRouter.get('/', handleGetAllEmployees);

/**
 * @openapi
 * /api/v1/employees/by-branch:
 *   get:
 *     summary: Get employees filtered by branch
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID to filter employees by
 *     responses:
 *       200:
 *         description: Filtered employees by branch.
 */
employeeRouter.get('/by-branch', handleGetEmployeesByBranch);

/**
 * @openapi
 * /api/v1/employees/by-department:
 *   get:
 *     summary: Get employees filtered by department
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: Department name to filter employees by
 *     responses:
 *       200:
 *         description: Filtered employees by department.
 */
employeeRouter.get('/by-department', handleGetEmployeesByDepartment);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Employee details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found.
 */
employeeRouter.get('/:id', handleGetEmployeeById);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeUpdate'
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 *       400:
 *         description: Bad request or validation error.
 *       404:
 *         description: Employee not found.
 */
employeeRouter.put(
  '/:id',
  validateBody(updateEmployeeSchema),
  handleUpdateEmployee
);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Employee deleted successfully.
 *       404:
 *         description: Employee not found.
 */
employeeRouter.delete('/:id', handleDeleteEmployee);
