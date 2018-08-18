import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCc4UqaF9aHPkQ4bxghxjMLTndhQI41Se8',
  authDomain: 'it-connect-2018.firebaseapp.com',
  databaseURL: 'https://it-connect-2018.firebaseio.com',
  projectId: 'it-connect-2018',
  storageBucket: 'it-connect-2018.appspot.com',
  messagingSenderId: '316049883453'
}

firebase.initializeApp(config)
