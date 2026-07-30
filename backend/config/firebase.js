import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "./serviceAccountKey.json" with {
    type: "json",
};

console.log("PROJECT ID:", serviceAccount.project_id);

initializeApp({
    credential: cert(serviceAccount),
});

export const db = getFirestore();