// src/api/v1/controllers/employeeController.ts

import { Request, Response } from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesByBranchId,
  getEmployeesByDepartment,
  NewEmployee
} from '../services/employeeService';

// handleGetAllEmployees, handleGetEmployeeById,
// handleCreateEmployee, handleUpdateEmployee, handleDeleteEmployee

export function handleGetAllEmployees(req: Request, res: Response): void {
  const employees = getAllEmployees();
  res.status(200).json(employees);
}

export function handleGetEmployeeById(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Invalid employee id parameter' });
    return;
  }

  const employee = getEmployeeById(id);

  if (!employee) {
    res.status(404).json({ message: 'Employee not found' });
    return;
  }

  res.status(200).json(employee);
}

export function handleCreateEmployee(req: Request, res: Response): void {
  const { name, position, department, email, phone, branchId } = req.body as Partial<NewEmployee>;

  if (!name || !position || !department || !email || !phone || branchId === undefined) {
    res.status(400).json({ message: 'Missing required employee fields' });
    return;
  }

  const newEmployee = createEmployee({
    name,
    position,
    department,
    email,
    phone,
    branchId: Number(branchId)
  });

  res.status(201).json(newEmployee);
}

export function handleUpdateEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Invalid employee id parameter' });
    return;
  }

  const updates = req.body as Partial<NewEmployee>;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ message: 'No fields provided for update' });
    return;
  }

  const updated = updateEmployee(id, updates);

  if (!updated) {
    res.status(404).json({ message: 'Employee not found' });
    return;
  }

  res.status(200).json(updated);
}

export function handleDeleteEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Invalid employee id parameter' });
    return;
  }

  const deleted = deleteEmployee(id);

  if (!deleted) {
    res.status(404).json({ message: 'Employee not found' });
    return;
  }

  res.status(200).json({ message: 'Employee deleted successfully' });
}

export function handleGetEmployeesByBranch(req: Request, res: Response): void {
  const { branchId } = req.query;

  if (!branchId) {
    res.status(400).json({ message: 'branchId query parameter is required' });
    return;
  }

  const id = Number(branchId);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'branchId must be a number' });
    return;
  }

  const result = getEmployeesByBranchId(id);
  res.status(200).json(result);
}

export function handleGetEmployeesByDepartment(req: Request, res: Response): void {
  const { department } = req.query;

  if (!department || typeof department !== 'string') {
    res.status(400).json({ message: 'department query parameter is required' });
    return;
  }

  const result = getEmployeesByDepartment(department);
  res.status(200).json(result);
}
