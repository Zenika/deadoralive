import firebase from 'firebase/app';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "FIREBASE_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://FIREBASE_PROJECT_ID.firebaseio.com",
    projectId: "FIREBASE_PROJECT_ID",
    storageBucket: "FIREBASE_PROJECT_ID.appspot.com",
    measurementId: "GOOGLE_ANALYTICS"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();