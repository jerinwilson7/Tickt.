import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

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
export const useAuth =()=> useContext<AuthContextType>(AuthContext);

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
  },[]);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      return userCredential;
    } catch (error) {
      console.log('unexpected error occurred while login :', error);
      throw(error)
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      return userCredential;
    } catch (error) {
      console.log('unexpected error occurred while login :', error);
      throw(error)
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
  }

   return (
    <AuthContext.Provider value={values}>
      {isLoading ? null : children}
    </AuthContext.Provider>
   )
};
