import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFzGV1ViHUaFcEyzIsATFIFDrBkwxp8Ao",
  authDomain: "authentication-a3fe6.firebaseapp.com",
  projectId: "authentication-a3fe6",
  storageBucket: "authentication-a3fe6.appspot.com",
  messagingSenderId: "781044660504",
  appId: "1:781044660504:web:c62d46a0fc36f07786866d",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
