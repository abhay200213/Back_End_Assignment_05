// src/api/v1/services/employeeService.ts

import { employees } from "../../../data/employees";
import { Employee } from "../models/employee";

export type NewEmployee = Omit<Employee, "id">;

let nextEmployeeId = employees.length + 1;

// Get all employees
export function getAllEmployees(): Employee[] {
  return employees;
}

// Get employee by ID
export function getEmployeeById(id: number): Employee | undefined {
  return employees.find((e) => e.id === id);
}

// Create new employee
export function createEmployee(data: NewEmployee): Employee {
  const newEmployee: Employee = {
    id: nextEmployeeId++,
    ...data,
  };

  employees.push(newEmployee);
  return newEmployee;
}

// Update employee
export function updateEmployee(
  id: number,
  updates: Partial<NewEmployee>
): Employee | null {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updated = {
    ...employees[index],
    ...updates,
  };

  employees[index] = updated;
  return updated;
}

// Delete employee
export function deleteEmployee(id: number): boolean {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
}

// Get employees by branch
export function getEmployeesByBranchId(branchId: number): Employee[] {
  return employees.filter((e) => e.branchId === branchId);
}

// Get employees by department
export function getEmployeesByDepartment(department: string): Employee[] {
  const normalized = department.toLowerCase();
  return employees.filter((e) => e.department.toLowerCase() === normalized);
}
