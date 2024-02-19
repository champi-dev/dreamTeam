import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const manifest = Constants.manifest2 ?? Constants.manifest;
const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = manifest.extra.expoClient.extra;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };