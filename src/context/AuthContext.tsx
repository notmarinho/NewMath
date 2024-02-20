import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type UserData = {
  name: string;
  email: string;
  finished_subjects_ids: string[];
  answers_ids: string[];
};

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  userData: UserData | null;
  isLoading: boolean;
  signOut: () => void;
};

const AuthContext = React.createContext({} as AuthContextType);

const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  function onAuthStateChanged(nextUser: FirebaseAuthTypes.User | null) {
    setUser(nextUser);
    if (isLoading) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        setUserData(documentSnapshot.data() as UserData);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [user?.uid]);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <AuthContext.Provider value={{user, isLoading, signOut, userData}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, useAuth};
