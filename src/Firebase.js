import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4DoxelNWGHyFN4ItyPKnh4EjzTLEMyDs",
    authDomain: "sticky-note-98397.firebaseapp.com",
    projectId: "sticky-note-98397",
    storageBucket: "sticky-note-98397.appspot.com",
    messagingSenderId: "320801363751",
    appId: "1:320801363751:web:789800b49731b7564afb02"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log(db);
