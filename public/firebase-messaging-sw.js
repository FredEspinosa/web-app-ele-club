// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

const firebaseApyKey = import.meta.env.VITE_HELENA_FIREBASE_APKY;
const firebaseAuhtDomain =import.meta.env.VITE_HELENA_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId =import.meta.env.VITE_HELENA_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = import.meta.env.VITE_HELENA_FIREBASE_STORAGE_BUCKET;
const firebaseMessaginSenderId = import.meta.env.VITE_HELENA_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = import.meta.env.VITE_HELENA_FIREBASE_APP_ID;
const firebaseMeasuramentId = import.meta.env.VITE_HELENA_FIREBASE_MEASUREMENT_ID;

// firebase.initializeApp({
//   apiKey: "AIzaSyBw3PfxvKcXF4USNMA4jN7uYAUM4l7dbiQ",
//   authDomain: "helenaapp-75fdb.firebaseapp.com",
//   projectId: "helenaapp-75fdb",
//   storageBucket: "helenaapp-75fdb.firebasestorage.app",
//   messagingSenderId: "1088597517320",
//   appId: "1:1088597517320:web:9f7573c5316f83d6e99dbd",
//   measurementId: "G-MSSGEF52TS"
// });

firebase.initializeApp({
  apiKey: firebaseApyKey,
  authDomain: firebaseAuhtDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessaginSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasuramentId,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Received background message:", payload);

  const { title, body } = payload.notification;

  const notificationOptions = {
    body: body,
    icon: '/logo192.png' // Cambia por tu ícono si tienes uno
  };

  self.registration.showNotification(title, notificationOptions);
});
