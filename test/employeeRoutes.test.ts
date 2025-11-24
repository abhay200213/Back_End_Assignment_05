// test/employeeRoutes.test.ts

import request from 'supertest';
import app from '../src/app';

describe('Employee Routes', () => {
  describe('POST /api/v1/employees', () => {
    it('should create a new employee successfully', async () => {
      const newEmployee = {
        name: 'Test User',
        position: 'Developer',
        department: 'IT',
        email: 'test.user@pixell-river.com',
        phone: '204-555-9999',
        branchId: 1
      };

      const res = await request(app)
        .post('/api/v1/employees')
        .send(newEmployee);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(newEmployee.name);
      expect(res.body.email).toBe(newEmployee.email);
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteEmployee = {
        name: 'Incomplete User'
        // missing position, department, email, phone, branchId
      };

      const res = await request(app)
        .post('/api/v1/employees')
        .send(incompleteEmployee);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/v1/employees', () => {
    it('should return all employees as an array', async () => {
      const res = await request(app).get('/api/v1/employees');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should still return an array even after creating employees', async () => {
      const res = await request(app).get('/api/v1/employees');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/v1/employees/:id', () => {
    it('should return a single employee for a valid id', async () => {
      const res = await request(app).get('/api/v1/employees/1');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('should return 400 when id parameter is invalid', async () => {
      const res = await request(app).get('/api/v1/employees/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/v1/employees/:id', () => {
    it('should update an existing employee successfully', async () => {
      // update employee with id 1
      const res = await request(app)
        .put('/api/v1/employees/1')
        .send({ phone: '204-555-1234' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('phone', '204-555-1234');
    });

    it('should return 400 when no fields are provided for update', async () => {
      const res = await request(app)
        .put('/api/v1/employees/1')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/v1/employees/:id', () => {
    it('should delete an employee successfully', async () => {
      // First create an employee to delete
      const createRes = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'To Be Deleted',
          position: 'Temp',
          department: 'IT',
          email: 'delete.me@pixell-river.com',
          phone: '204-555-0000',
          branchId: 1
        });

      const idToDelete = createRes.body.id;

      const deleteRes = await request(app).delete(`/api/v1/employees/${idToDelete}`);

      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body).toHaveProperty('message', 'Employee deleted successfully');
    });

    it('should return 400 when id parameter is invalid', async () => {
      const res = await request(app).delete('/api/v1/employees/invalid');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
    describe('GET /api/v1/employees/by-branch', () => {
    it('should return all employees for a given branchId', async () => {
      // branchId 1 exists in sample data
      const res = await request(app).get('/api/v1/employees/by-branch').query({ branchId: 1 });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);

      // all returned employees should have branchId 1
      res.body.forEach((emp: any) => {
        expect(emp.branchId).toBe(1);
      });
    });

    it('should return 400 when branchId query parameter is missing', async () => {
      const res = await request(app).get('/api/v1/employees/by-branch');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/v1/employees/by-department', () => {
    it('should return all employees for a given department', async () => {
      // "IT" exists in sample data
      const res = await request(app)
        .get('/api/v1/employees/by-department')
        .query({ department: 'IT' });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);

      res.body.forEach((emp: any) => {
        expect(emp.department).toBe('IT');
      });
    });

    it('should return 400 when department query parameter is missing', async () => {
      const res = await request(app).get('/api/v1/employees/by-department');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});
