import React, { createContext, useEffect, useReducer } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { authState } from '../atoms/auth';
import { FirebaseContextType } from '@/types/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDiyMFnM1CM6C4XUhLgHrtjloOjyk0ECz4",
  authDomain: "homekitchen-55393.firebaseapp.com",
  databaseURL: "https://homekitchen-55393-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "homekitchen-55393",
  storageBucket: "homekitchen-55393.appspot.com",
  messagingSenderId: "218849426684",
  appId: "1:218849426684:web:7e34dc7aa3d17634ed2b79",
  measurementId: "G-Y869SZN9KS"
};

const app = initializeApp(firebaseConfig);

// const
// const initialState: AuthProps = {
//   isLoggedIn: false,
//   isInitialized: false,
//   user: null
// };

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useRecoilState(authState);

  const auth = getAuth(app);
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
            isLoggedIn: true,
            user: {
              id: user.uid,
              email: user.email,
              name: user.displayName || 'Stebin Ben',
              role: 'UI/UX Designer',
            },
            isInitialized : false
        });
      } else {
        dispatch({
          isLoggedIn: false,
          user: null,
          isInitialized : false
      });
      }
    });
  }, [dispatch]);

  const firebaseEmailPasswordSignIn = (email: string, password: string) => signInWithEmailAndPassword(auth,email, password);

  const firebaseGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider);
  };

  const firebaseTwitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseRegister = async (email: string, password: string) => createUserWithEmailAndPassword(auth,email, password);

  const logout = () => signOut(auth);

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth,email);
  };

  const updateProfile = () => {console.log("update profile")};
  // if (state.isInitialized !== undefined && !state.isInitialized) {
  //   return <div >Loading</div>;
  // }

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        firebaseRegister,
        firebaseEmailPasswordSignIn,
        login: () => {console.log("login");
        },
        firebaseGoogleSignIn,
        firebaseTwitterSignIn,
        firebaseFacebookSignIn,
        logout,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
