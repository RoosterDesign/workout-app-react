import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAkNhOS6Xn5_FpP785g-p0uG1evf0lwvEk",
    authDomain: "workout-app-2d641.firebaseapp.com",
    databaseURL: "https://workout-app-2d641.firebaseio.com",
    projectId: "workout-app-2d641",
    storageBucket: "workout-app-2d641.appspot.com",
    messagingSenderId: "964577927257",
    appId: "1:964577927257:web:fc879c6764791b267dd148"
};
firebase.initializeApp(firebaseConfig);

export default firebase;