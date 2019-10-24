import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDwePumIFXD1WfW_Nlhr4IPH3jE8NqsIuw",
  authDomain: "towary-c59cd.firebaseapp.com",
  databaseURL: "https://towary-c59cd.firebaseio.com",
  projectId: "towary-c59cd",
  storageBucket: "towary-c59cd.appspot.com",
  messagingSenderId: "434613488359",
  appId: "1:434613488359:web:c8652b40985fc35f4bb042"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export {
  firestore,
  firebase,
  firebaseui
}