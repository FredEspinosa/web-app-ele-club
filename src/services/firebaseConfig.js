// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBw3PfxvKcXF4USNMA4jN7uYAUM4l7dbiQ",
    authDomain: "helenaapp-75fdb.firebaseapp.com",
    projectId: "helenaapp-75fdb",
    storageBucket: "helenaapp-75fdb.firebasestorage.app",
    messagingSenderId: "1088597517320",
    appId: "1:1088597517320:web:9f7573c5316f83d6e99dbd",
    measurementId: "G-MSSGEF52TS"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

console.log("db", db);
console.log("auth", auth);
console.log("messaging", messaging);


let analytics = null;
isSupported().then((supported) => {
  if (supported && typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
});

export { app, db, auth, messaging, analytics };
