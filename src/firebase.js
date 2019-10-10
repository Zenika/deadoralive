import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "FIREBASE_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://FIREBASE_PROJECT_ID.firebaseio.com",
    projectId: "FIREBASE_PROJECT_ID",
    storageBucket: "FIREBASE_PROJECT_ID.appspot.com",
    measurementId: "GOOGLE_ANALYTICS",
    messagingSenderId: "FIREBASE_MESSAGING_ID",
    appId: "FIREBASE_APP_ID",
  };

let db;
console.log(firebaseConfig);
if (firebaseConfig.apiKey) {
  const app = firebase.initializeApp(firebaseConfig);
  app.analytics();
  db = app.firestore();
}


export const storeScore = async game => {
  if (db) {
    await db.collection("score").add(game);
  }
}