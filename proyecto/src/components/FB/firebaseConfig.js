import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBlj6pJl9HCoc0uEgUnPTFbZNPnCk0xX8E",
    authDomain: "pymecta.firebaseapp.com",
    databaseURL: "https://pymecta.firebaseio.com",
    projectId: "pymecta",
    storageBucket: "pymecta.appspot.com",
    messagingSenderId: "861302185815",
    appId: "1:861302185815:web:1eee3e499c055487172812",
    measurementId: "G-K1YM4DSTN5"
  };
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const db = firebase.database();
  export default firebaseConfig;