
export const auth = {
  verifyIdToken: async (_token: string): Promise<void> => {
    return;
  },
  getUser: async (_uid: string): Promise<void> => {
    return;
  }
};

export const db = {
  collection: (_name: string): unknown => {
    return {};
  },
  runTransaction: async <T>(_updateFn: () => Promise<T>): Promise<T | void> => {
    return;
  },
  batch: (): unknown => {
    return {};
  }
};
