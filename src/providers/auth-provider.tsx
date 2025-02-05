import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CustomError } from '../utils/error';

const initialValue = {
  setIsAuthenticating: () => {},
  signOut: () => {},
  user: null,
  isAuthenticating: false,
};

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  isAuthenticating: boolean;
  setIsAuthenticating: React.Dispatch<React.SetStateAction<boolean>>;
  signIn?: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>;
  signOut: () => void;
  signUp?: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential>;
}

export const AuthContext = createContext<AuthContextType>(initialValue);
export const useAuth = () => useContext<AuthContextType>(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });
    setIsLoading(false);

    return () => subscriber();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      return userCredential;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new CustomError('Email already exists',400);
      }
      throw new CustomError('unexpected error occurred while login',400);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      return userCredential;
    } catch (error: any) {
      console.log(error)
      if (error.code === 'auth/invalid-credential') {
        throw new CustomError('Invalid email or password',400);
      } else if (error.code === 'auth/user-not-found') {
        throw new CustomError('No user found with this email',400);
      } else if (error.code === 'auth/wrong-password') {
        throw new CustomError('Incorrect password',400);
      }
      throw new CustomError('Unexpected error occurred while logging in',400);
    }
  };

  const signOut = () => {
    setUser(null);
    auth()
      .signOut()
      .then(() => console.log('user signout'));
  };

  const values = {
    user,
    signIn,
    signOut,
    signUp,
    isAuthenticating,
    isLoading,
    setIsAuthenticating,
  };

  return (
    <AuthContext.Provider value={values}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
