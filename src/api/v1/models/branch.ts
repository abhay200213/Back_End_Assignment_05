// src/api/v1/models/branch.ts
export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export type NewBranch = Omit<Branch, "id">;
