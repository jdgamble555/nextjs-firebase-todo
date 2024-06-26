
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebase_config = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG!
);

// initialize and login

export const app = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

export const auth = getAuth(app);
export const db = getFirestore(app);