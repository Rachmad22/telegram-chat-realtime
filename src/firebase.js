// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOKhYcUHwmwRa42SXeWlY03JgtK-yUNys",
    authDomain: "chatting-next.firebaseapp.com",
    projectId: "chatting-next",
    storageBucket: "chatting-next.appspot.com",
    messagingSenderId: "332736173948",
    appId: "1:332736173948:web:0d924b4c599e918eccb6f9",
    measurementId: "G-ZTNSWDXQBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);