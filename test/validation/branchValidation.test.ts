import { createBranchSchema } from "../../src/api/v1/validation/branchValidation";

describe("Branch validation schema", () => {
  it("should validate correct branch data", () => {
    const result = createBranchSchema.validate({
      name: "Test Branch",
      address: "123 Street",
      phone: "1234567"
    });

    expect(result.error).toBeUndefined();
  });

  it("should reject invalid branch data", () => {
    const result = createBranchSchema.validate({
      name: "",
      phone: ""
    });

    expect(result.error).toBeDefined();
  });
});
