import * as firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAN8UlWsomFFk5PjTtR0VsXdgmKAh6kSf0",
    authDomain: "olxp-pk.firebaseapp.com",
    databaseURL: "https://olxp-pk.firebaseio.com",
    projectId: "olxp-pk",
    storageBucket: "olxp-pk.appspot.com",
    messagingSenderId: "68803974548",
    appId: "1:68803974548:web:76511dd2aee0516ba2eb81",
    measurementId: "G-7Y5DSFE4GY"
  };
export default firebase.initializeApp(firebaseConfig);