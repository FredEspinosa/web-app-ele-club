// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "<VITE_HELENA_FIREBASE_APKY>",
  authDomain: "<VITE_HELENA_FIREBASE_AUTH_DOMAIN>",
  projectId: "<VITE_HELENA_FIREBASE_PROJECT_ID>",
  storageBucket: "<VITE_HELENA_FIREBASE_STORAGE_BUCKET>",
  messagingSenderId: "<VITE_HELENA_FIREBASE_MESSAGING_SENDER_ID>",
  appId: "<VITE_HELENA_FIREBASE_APP_ID>",
  measurementId: "<VITE_HELENA_FIREBASE_MEASUREMENT_ID>",
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
