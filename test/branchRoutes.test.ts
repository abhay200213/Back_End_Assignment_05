// test/branchRoutes.test.ts

import request from 'supertest';
import app from '../src/app';

describe('Branch Routes', () => {
  describe('POST /api/v1/branches', () => {
    it('should create a new branch successfully', async () => {
      const newBranch = {
        name: 'Test Branch',
        address: '123 Test St, Test City, TC',
        phone: '204-555-9999'
      };

      const res = await request(app)
        .post('/api/v1/branches')
        .send(newBranch);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(newBranch.name);
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteBranch = {
        name: 'Incomplete Branch'
        // missing address and phone
      };

      const res = await request(app)
        .post('/api/v1/branches')
        .send(incompleteBranch);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/v1/branches', () => {
    it('should return all branches as an array', async () => {
      const res = await request(app).get('/api/v1/branches');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should still return an array after creating branches', async () => {
      const res = await request(app).get('/api/v1/branches');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/v1/branches/:id', () => {
    it('should return a single branch for a valid id', async () => {
      const res = await request(app).get('/api/v1/branches/1');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('should return 400 when id parameter is invalid', async () => {
      const res = await request(app).get('/api/v1/branches/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/v1/branches/:id', () => {
    it('should update an existing branch successfully', async () => {
      const res = await request(app)
        .put('/api/v1/branches/1')
        .send({ phone: '204-555-7777' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('phone', '204-555-7777');
    });

    it('should return 400 when no fields are provided for update', async () => {
      const res = await request(app)
        .put('/api/v1/branches/1')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/v1/branches/:id', () => {
    it('should delete a branch successfully', async () => {
      // create a branch to delete
      const createRes = await request(app)
        .post('/api/v1/branches')
        .send({
          name: 'To Be Deleted Branch',
          address: 'Delete St, Nowhere',
          phone: '204-555-0000'
        });

      const idToDelete = createRes.body.id;

      const deleteRes = await request(app).delete(`/api/v1/branches/${idToDelete}`);

      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body).toHaveProperty('message', 'Branch deleted successfully');
    });

    it('should return 400 when id parameter is invalid', async () => {
      const res = await request(app).delete('/api/v1/branches/invalid');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});
