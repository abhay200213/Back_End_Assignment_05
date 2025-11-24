// Temporary stub for Assignment 3 setup.
// Will be replaced with real Firebase Admin / Firestore config in the Firestore integration step.

export const auth = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verifyIdToken: async (_token: string): Promise<void> => {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUser: async (_uid: string): Promise<void> => {
    return;
  }
};

export const db = {
  // We keep these very loose; repository layer will define stricter types when we wire Firestore.
  collection: (_name: string): unknown => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  runTransaction: async <T>(_updateFn: () => Promise<T>): Promise<T | void> => {
    return;
  },
  batch: (): unknown => {
    return {};
  }
};
