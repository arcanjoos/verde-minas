import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCOsIjUjOOg7BY8uAwLVcHGDgYBGoUmNew',
  authDomain: 'plus-compras-70fcb.firebaseapp.com',
  projectId: 'plus-compras-70fcb',
  storageBucket: 'plus-compras-70fcb.appspot.com',
  messagingSenderId: '275796562200',
  appId: '1:275796562200:web:f63621dfbb9776cad44e6d'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default { firebase, db };

