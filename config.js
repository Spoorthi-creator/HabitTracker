import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDKn3MCnxG_6PYHFZNSp3LWSetc0uhKu-Q",
  authDomain: "habittracker-eed5a.firebaseapp.com",
  projectId: "habittracker-eed5a",
  storageBucket: "habittracker-eed5a.appspot.com",
  messagingSenderId: "988044578436",
  appId: "1:988044578436:web:1cb223b13ea0a0540a3cd1"
};

if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}
export default firebase.firestore();