// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD53Gyj3HBu5skWhI3QtnTRM4NUw3qJFC4",
    authDomain: "i-placed-portal-auth.firebaseapp.com",
    projectId: "i-placed-portal-auth",
    storageBucket: "i-placed-portal-auth.appspot.com",
    messagingSenderId: "859416767221",
    appId: "1:859416767221:web:c4736d060cf67afaf2b3bc",
    measurementId: "G-L10VPF59T3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();