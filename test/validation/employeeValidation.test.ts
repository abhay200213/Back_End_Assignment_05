import { createEmployeeSchema } from "../../src/api/v1/validation/employeeValidation";

describe("Employee validation schema", () => {
  it("should validate correct employee data", () => {
    const result = createEmployeeSchema.validate({
      name: "John Doe",
      position: "Manager",
      department: "IT",
      email: "john@example.com",
      phone: "1234567",
      branchId: 1
    });

    expect(result.error).toBeUndefined();
  });

  it("should reject invalid employee data", () => {
    const result = createEmployeeSchema.validate({
      name: "",
      position: "",
      email: "invalid-email"
    });

    expect(result.error).toBeDefined();
  });
});
