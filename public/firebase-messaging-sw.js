// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCfwSIW90nuLvUiX4uE1v_PxvidkWQAa5A",
  authDomain: "shahinvestment-95269.firebaseapp.com",
  projectId: "shahinvestment-95269",
  storageBucket: "shahinvestment-95269.appspot.com",
  messagingSenderId: "507285511281",
  appId: "1:507285511281:web:3adc2cc039465ee6438fd0"
};

firebase.initializeApp(firebaseConfig); 

const messaging = firebase.messaging();

 