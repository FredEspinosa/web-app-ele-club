// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics, isSupported } from 'firebase/analytics';


const firebaseApyKey = import.meta.env.VITE_HELENA_FIREBASE_APKY;
const firebaseAuhtDomain =import.meta.env.VITE_HELENA_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId =import.meta.env.VITE_HELENA_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = import.meta.env.VITE_HELENA_FIREBASE_STORAGE_BUCKET;
const firebaseMessaginSenderId = import.meta.env.VITE_HELENA_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = import.meta.env.VITE_HELENA_FIREBASE_APP_ID;
const firebaseMeasuramentId = import.meta.env.VITE_HELENA_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
    apiKey: firebaseApyKey,
    authDomain: firebaseAuhtDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessaginSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasuramentId,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

let analytics = null;
isSupported().then((supported) => {
  if (supported && typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
});

export { app, db, auth, messaging, analytics };
