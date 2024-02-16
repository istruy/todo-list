import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  signOut,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { TAuthContext, TLoginWithEmailAndPasswordResult } from './types';
import { FirebaseApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from '@firebase/firestore';

type TProps = {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
};

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  loginWithPopup: () => Promise.reject({}),
  logOut: () => void 0,
  user: '',
});

export const ALLOWED_OAUTH_PROVIDER: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

const isUserAdmin = async (firebase: FirebaseApp) => {
  const db = getFirestore(firebase);
  return await getDoc(doc(db, '/internal/auth'));
};

export const AuthContextProvider: FC<TProps> = ({ children, firebaseApp }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext['isAuthenticated']>(null);
  // const [userApp, setUserApp] = useState<TAuthContext['user']>(null);
  const [user, setUser] = useState<any>(null);
  const [auth] = useState(getAuth(firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }
    auth.setPersistence(browserSessionPersistence);
    auth.languageCode = 'ru';

    auth.onAuthStateChanged((user) => {
      if (user) {
        isUserAdmin(firebaseApp)
          .then(() => {
            setUser(user);
            // setUserApp(user);
            setIsAuthenticated(true);
          })
          .catch(() => {
            logOut();
            setUser(null);
            // setUserApp(user);
            setIsAuthenticated(false);
          });
      } else {
        setUser(null);
        // setUserApp(null)
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const processLogin = (promiseLogin: Promise<UserCredential>): Promise<TLoginWithEmailAndPasswordResult> => {
    setUser(null);
    // setUserApp(null);
    setIsAuthenticated(null);
    return promiseLogin
      .then((result) => {
        // log success auth
        return result;
      })
      .catch((error) => {
        // log auth errors
        throw error;
      });
  };

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return processLogin(signInWithEmailAndPassword(auth, email, password));
  };

  const loginWithPopup = (provider: string) => {
    return processLogin(signInWithPopup(auth, ALLOWED_OAUTH_PROVIDER[provider]));
  };

  const logOut = () => signOut(auth);

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        // userApp,
        loginWithEmailAndPassword,
        logOut,
        loginWithPopup,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
