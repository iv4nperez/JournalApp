import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDN2uDP_6400Tv2wwC6cQzCZPEXoJAxAO0",
    authDomain: "journal-app-5973a.firebaseapp.com",
    projectId: "journal-app-5973a",
    storageBucket: "journal-app-5973a.appspot.com",
    messagingSenderId: "348124594141",
    appId: "1:348124594141:web:f2ec5cad24a3a90579c034",
    measurementId: "G-CTWZ21L6QE"
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}