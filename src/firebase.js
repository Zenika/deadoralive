import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "FIREBASE_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://FIREBASE_PROJECT_ID.firebaseio.com",
    projectId: "FIREBASE_PROJECT_ID",
    storageBucket: "FIREBASE_PROJECT_ID.appspot.com",
    messagingSenderId: "FIREBASE_MESSAGING_ID",
    appId: "FIREBASE_APP_ID",
  };

let db;
if (firebaseConfig.apiKey) {
  const app = firebase.initializeApp(firebaseConfig);
  db = app.firestore();
}


export const storeScore = async game => {
  if (db) {
    try {
      await db.collection("score").add(game);
    } catch (e) {
      console.error('Error while saving score for game', game, e);
      return false;
    }
  }
  return true;
}
