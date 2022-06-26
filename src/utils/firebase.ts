import React, { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

export const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name as string);
      localStorage.setItem("email", email as string);
      localStorage.setItem("profilePic", profilePic as string);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const useSession = () => {
  const [userInSession, setUserInSession] = useState<User>();
  const [error, setError] = useState<boolean>();

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) return;
        setUserInSession(user as User);

        user.getIdToken().then((accessToken) => {
          console.log(accessToken); // It shows the Firebase token now
          localStorage.setItem("accessToken", accessToken);
        });
      },
      () => setError(true)
    );

    return unsub;
  }, []);

  return {
    userInSession,
    sessionLoading: !error && !userInSession,
    sessionError: error,
  };
};

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user as User);
        setLoading(false);
      },
      () => setError(true)
    );

    return unsub;
  }, []);

  const authObj = {
    user: currentUser,
    userLoading: loading,
    userError: error,
    emailVerified: currentUser?.emailVerified || false,
    phoneVerified: currentUser?.phoneNumber ? true : false,
    // roleVerified: currentUser?.role ? true : false,
  };

  return authObj;
}

export default firebaseConfig;
