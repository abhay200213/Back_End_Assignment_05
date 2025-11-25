// src/config/firebaseConfig.ts

import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.resolve(
  __dirname,
  "../../firebase-service-account.json"
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(serviceAccountPath)
    ),
  });
}

export const auth = admin.auth();
export const db = admin.firestore();
