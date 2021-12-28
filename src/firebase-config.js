import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from "./config";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
