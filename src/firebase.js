import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC8CHyXKE8dmCBeNyKLWqhgDC-TPRMz_UY",
  authDomain: "social-5949d.firebaseapp.com",
  projectId: "social-5949d",
  storageBucket: "social-5949d.appspot.com",
  messagingSenderId: "400553909900",
  appId: "1:400553909900:web:be64fe5a1e0dd7a67665a9"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase};
