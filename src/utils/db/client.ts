import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


type FirebaseConfigType = Record<string, string | undefined>

const config : FirebaseConfigType = {
  apiKey: "AIzaSyCWuaXo92JU_XVh6j9oHcj5h_MD-oYTrAU",
  authDomain: "planox-c7beb.firebaseapp.com",
  databaseURL: "https://planox-c7beb.firebaseio.com",
  projectId: "planox-c7beb",
  storageBucket: "planox-c7beb.appspot.com",
  messagingSenderId: "658376013625",
  appId: "1:658376013625:web:5073ce05049d6a57e4dae8",
  measurementId: "G-CBNJYDPGSZ"
};

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  } catch (error) {
    console.log('Firebase initialization error', error.message);
  }
}

export const db = firebase.firestore();
export const cTodos = db.collection('todos');
export default firebase;