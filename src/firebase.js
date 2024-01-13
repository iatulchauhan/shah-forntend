import { initializeApp, } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCfwSIW90nuLvUiX4uE1v_PxvidkWQAa5A",
  authDomain: "shahinvestment-95269.firebaseapp.com",
  projectId: "shahinvestment-95269",
  storageBucket: "shahinvestment-95269.appspot.com",
  messagingSenderId: "507285511281",
  appId: "1:507285511281:web:3adc2cc039465ee6438fd0"
};
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: "BAgWm0q-SCuyrmaB3rcM-eA-JQJuhu8SHEQeh1UpqN-GpwPcSDIyexNCyiooR8pNzV2WEmVDr-tfTsxqc9W6XZ0"
  }
  )
    .then((currentToken) => {
      if (currentToken) {
        console.log('currentToken👌👌👌👌👌👌👌👌👌👌', currentToken)
        localStorage.setItem("deviceToken", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token.👌👌👌", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
