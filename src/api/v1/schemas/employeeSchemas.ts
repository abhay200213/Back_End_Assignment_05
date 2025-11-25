import Joi from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "emp_123"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         branchId:
 *           type: string
 *           example: "branch_001"
 *         position:
 *           type: string
 *           example: "Manager"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-24T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-24T12:00:00.000Z"
 *
 *     EmployeeCreate:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - branchId
 *         - position
 *       properties:
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         branchId:
 *           type: string
 *           example: "branch_001"
 *         position:
 *           type: string
 *           example: "Manager"
 */

export const employeeCreateSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  branchId: Joi.string().required(),
  position: Joi.string().min(2).max(100).required(),
});
