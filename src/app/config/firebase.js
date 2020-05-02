import firebase from "firebase"
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyDAeRnkmJpQY4uYJjnQ4IdFQS7N4SqFgpM",
  authDomain: "event-app-de09a.firebaseapp.com",
  databaseURL: "https://event-app-de09a.firebaseio.com",
  projectId: "event-app-de09a",
  storageBucket: "event-app-de09a.appspot.com",
  messagingSenderId: "467502904721",
  appId: "1:467502904721:web:3d8cbe5cec58d787fe9630",
  measurementId: "G-PW97B0VWCS"
}

firebase.initializeApp(firebaseConfig)

/** Requires timestamp settings for later versions of firebase */

export default firebase
