
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebase_config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string);

// initialize and login

if (!getApps().length) {
    initializeApp(firebase_config);
}

export const auth = getAuth();
export const db = getFirestore();