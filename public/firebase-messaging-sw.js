// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBw3PfxvKcXF4USNMA4jN7uYAUM4l7dbiQ",
  authDomain: "helenaapp-75fdb.firebaseapp.com",
  projectId: "helenaapp-75fdb",
  storageBucket: "helenaapp-75fdb.firebasestorage.app",
  messagingSenderId: "1088597517320",
  appId: "1:1088597517320:web:9f7573c5316f83d6e99dbd",
  measurementId: "G-MSSGEF52TS"
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
