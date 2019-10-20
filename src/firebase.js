import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://FIREBASE_PROJECT_ID.firebaseio.com",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_PROJECT_ID.appspot.com",
  messagingSenderId: "FIREBASE_MESSAGING_ID",
  appId: "FIREBASE_APP_ID",
};

let db;
let auth;

export const connected = new Promise((resolve, reject) => {
  try {
    if (firebaseConfig.apiKey) {
      const app = firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.setCustomParameters({
        'hd': 'zenika.com'
      })
      auth.signInWithPopup(googleProvider).then(() => {
        db = app.firestore();
        resolve(true);
      });
    } else {
      resolve(false);
    }
  } catch (e) {
    console.error(e);
    reject(e);
  }
})

export const isConnected = () => Boolean(db)

export const getPlayer = async email => {
  if (!db) throw Error('No DB');
  const doc = await db.collection('player').doc(email).get();
  return doc.data();
}

export const createPlayer = async player => {
  if (!db) throw Error('No DB');
  await db.collection('player').doc(player.email).set(player)
  return player
}

export const updatePlayer = player => {
  if (!db) throw Error('No DB');
  return db.collection('player').doc(player.email).set(player);
}

export const getScoreBoard = async (difficulty) => {
  if (!db) throw Error('No DB');
  const res = await db.collection('player').get();
  const players = res.docs.map(doc => doc.data());
  return players
    .map(player => ({
      ...player,
      games: player.games.filter(game => game.difficulty === difficulty),
    }))
    .filter(player => player.games.length)
    .map(player => ({
      ...player,
      score: player.games.reduce((maxScore, { score }) => score > maxScore ? score : maxScore, 0),
    }))
    .sort(({ score: score1 }, { score: score2 }) => score2 - score1)
}
