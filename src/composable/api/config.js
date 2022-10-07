
export let baseUrl='http://localhost:3000/';
import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAMCrAZ3SG-Nc4rMO0smjzxwbmKJEf64MA",
    authDomain: "vue-blogger-3f103.firebaseapp.com",
    projectId: "vue-blogger-3f103",
    storageBucket: "vue-blogger-3f103.appspot.com",
    messagingSenderId: "608874868799",
    appId: "1:608874868799:web:1d7fc65bbb110a390c888a"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
  
export { db, }