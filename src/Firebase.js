// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,
		signOut,updateProfile, onAuthStateChanged } from "firebase/auth";
import {createContext,useState,useEffect,useContext} from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
/*
  apiKey: "AIzaSyAkBlWozozBrseoCX49PmHFMNl1H2gSJ_w",
  authDomain: "gradportal-front.firebaseapp.com",
  projectId: "gradportal-front",
  storageBucket: "gradportal-front.appspot.com",
  messagingSenderId: "863330561204",
  appId: "1:863330561204:web:cfa162e95f904e600bbbe1",
  measurementId: "G-0K8RW4M570"
  */
 	apiKey: "AIzaSyA52K1l0RNMi0EVKKOcxO7DV5hwNcFsT1s",
    authDomain: "gradportal-11aef.firebaseapp.com",
    storageBucket: "gradportal-11aef.appspot.com",
    projectId: "gradportal-11aef",
    messagingSenderId: "572148562588",
    appId: "1:572148562588:web:69b9206ee5798cbba74b59"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export function signup(email,password){
	return createUserWithEmailAndPassword(auth,email,password);
}

export function signin(email,password){
	return signInWithEmailAndPassword(auth,email,password);
}

export function signout(){
	auth.signOut();
}
export function useAuth(){
	const [currentUser,setCurrentUser] = useState();
	useEffect(()=>{
		const unsub = onAuthStateChanged(auth,user=>setCurrentUser(user));
		return unsub;
	},[])
}