// test/services/employeeDbService.test.ts

import {
  createEmployeeDb,
  getAllEmployeesDb,
  getEmployeeByIdDb,
  updateEmployeeDb,
  deleteEmployeeDb,
} from "../../src/api/v1/services/employeeDbService";

import * as repo from "../../src/api/v1/repositories/firestoreRepository";

jest.mock("../../src/api/v1/repositories/firestoreRepository");

const mockedCreateDocument = repo.createDocument as jest.Mock;
const mockedGetDocuments = repo.getDocuments as jest.Mock;
const mockedGetDocumentById = repo.getDocumentById as jest.Mock;
const mockedUpdateDocument = repo.updateDocument as jest.Mock;
const mockedDeleteDocument = repo.deleteDocument as jest.Mock;

describe("employeeDbService", () => {
  it("should create employee and return id + data", async () => {
    const payload = {
      name: "Alice",
      position: "Developer",
      department: "IT",
      email: "alice@example.com",
      phone: "123",
      branchId: 1,
    } as any;

    mockedCreateDocument.mockResolvedValueOnce("emp123");

    const result = await createEmployeeDb(payload);

    expect(mockedCreateDocument).toHaveBeenCalledWith("employees", payload);
    expect(result).toEqual({ id: "emp123", data: payload });
  });

  it("should get all employees using repository", async () => {
    const docs = [{ id: "1", data: { name: "Alice" } }];
    mockedGetDocuments.mockResolvedValueOnce(docs);

    const result = await getAllEmployeesDb();

    expect(mockedGetDocuments).toHaveBeenCalledWith("employees");
    expect(result).toBe(docs);
  });

  it("should get employee by id using repository", async () => {
    const doc = { id: "1", data: { name: "Alice" } };
    mockedGetDocumentById.mockResolvedValueOnce(doc);

    const result = await getEmployeeByIdDb("1");

    expect(mockedGetDocumentById).toHaveBeenCalledWith("employees", "1");
    expect(result).toBe(doc);
  });

  it("should update employee via repository", async () => {
    mockedUpdateDocument.mockResolvedValueOnce(undefined);

    await updateEmployeeDb("1", { position: "Senior Dev" });

    expect(mockedUpdateDocument).toHaveBeenCalledWith(
      "employees",
      "1",
      { position: "Senior Dev" }
    );
  });

  it("should delete employee via repository", async () => {
    mockedDeleteDocument.mockResolvedValueOnce(undefined);

    await deleteEmployeeDb("1");

    expect(mockedDeleteDocument).toHaveBeenCalledWith("employees", "1");
  });
});
