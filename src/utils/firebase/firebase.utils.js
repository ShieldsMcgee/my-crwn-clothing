import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD7veg4YJ7741cdEvtE09jCbimt7zBjyvo",
    authDomain: "crwn-clothing-db-40e29.firebaseapp.com",
    projectId: "crwn-clothing-db-40e29",
    storageBucket: "crwn-clothing-db-40e29.appspot.com",
    messagingSenderId: "835193870268",
    appId: "1:835193870268:web:49b5cb93a43b6396667db9"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef
};