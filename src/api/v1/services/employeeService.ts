// src/api/v1/services/employeeService.ts

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: number;
}

import { employees, Employee } from '../../../data/employees';

export type NewEmployee = Omit<Employee, 'id'>;

let nextEmployeeId = employees.length + 1;

export function getAllEmployees(): Employee[] {
  return employees;
}

export function getEmployeeById(id: number): Employee | undefined {
  return employees.find((e) => e.id === id);
}

export function createEmployee(data: NewEmployee): Employee {
  const newEmployee: Employee = {
    id: nextEmployeeId++,
    ...data
  };

  employees.push(newEmployee);
  return newEmployee;
}

export function updateEmployee(
  id: number,
  updates: Partial<NewEmployee>
): Employee | null {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) {
    return null;
  }

  employees[index] = {
    ...employees[index],
    ...updates
  };

  return employees[index];
}

export function deleteEmployee(id: number): boolean {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) {
    return false;
  }

  employees.splice(index, 1);
  return true;
}

export function getEmployeesByBranchId(branchId: number): Employee[] {
  return employees.filter((e) => e.branchId === branchId);
}

export function getEmployeesByDepartment(department: string): Employee[] {
  const normalized = department.toLowerCase();
  return employees.filter(
    (e) => e.department.toLowerCase() === normalized
  );
}
