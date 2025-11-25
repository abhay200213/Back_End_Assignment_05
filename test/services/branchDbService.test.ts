// test/services/branchDbService.test.ts

import {
  createBranchDb,
  getAllBranchesDb,
  getBranchByIdDb,
  updateBranchDb,
  deleteBranchDb,
} from "../../src/api/v1/services/branchDbService";

import * as repo from "../../src/api/v1/repositories/firestoreRepository";

jest.mock("../../src/api/v1/repositories/firestoreRepository");

const mockedCreateDocument = repo.createDocument as jest.Mock;
const mockedGetDocuments = repo.getDocuments as jest.Mock;
const mockedGetDocumentById = repo.getDocumentById as jest.Mock;
const mockedUpdateDocument = repo.updateDocument as jest.Mock;
const mockedDeleteDocument = repo.deleteDocument as jest.Mock;

describe("branchDbService", () => {
  it("should create branch and return id + data", async () => {
    const payload = {
      name: "Test Branch",
      address: "123 Street",
      phone: "555-0000",
    } as any;

    mockedCreateDocument.mockResolvedValueOnce("br123");

    const result = await createBranchDb(payload);

    expect(mockedCreateDocument).toHaveBeenCalledWith("branches", payload);
    expect(result).toEqual({ id: "br123", data: payload });
  });

  it("should get all branches using repository", async () => {
    const docs = [{ id: "1", data: { name: "Branch 1" } }];
    mockedGetDocuments.mockResolvedValueOnce(docs);

    const result = await getAllBranchesDb();

    expect(mockedGetDocuments).toHaveBeenCalledWith("branches");
    expect(result).toBe(docs);
  });

  it("should get branch by id using repository", async () => {
    const doc = { id: "1", data: { name: "Branch 1" } };
    mockedGetDocumentById.mockResolvedValueOnce(doc);

    const result = await getBranchByIdDb("1");

    expect(mockedGetDocumentById).toHaveBeenCalledWith("branches", "1");
    expect(result).toBe(doc);
  });

  it("should update branch via repository", async () => {
    mockedUpdateDocument.mockResolvedValueOnce(undefined);

    await updateBranchDb("1", { phone: "555-1111" });

    expect(mockedUpdateDocument).toHaveBeenCalledWith(
      "branches",
      "1",
      { phone: "555-1111" }
    );
  });

  it("should delete branch via repository", async () => {
    mockedDeleteDocument.mockResolvedValueOnce(undefined);

    await deleteBranchDb("1");

    expect(mockedDeleteDocument).toHaveBeenCalledWith("branches", "1");
  });
});
