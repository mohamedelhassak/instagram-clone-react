import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAVyAksAEAKLXKgDqYArLAB2JAuq3LwruI",
  authDomain: "intagram-clone-8f7a4.firebaseapp.com",
  databaseURL: "https://intagram-clone-8f7a4.firebaseio.com",
  projectId: "intagram-clone-8f7a4",
  storageBucket: "intagram-clone-8f7a4.appspot.com",
  messagingSenderId: "1033310294526",
  appId: "1:1033310294526:web:4c90c16fcc42b4046b30af",
  measurementId: "G-GBJQFPW3TT",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
