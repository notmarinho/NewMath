import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  signOut: () => void;
};

const AuthContext = React.createContext({} as AuthContextType);

const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

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

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <AuthContext.Provider value={{user, isLoading, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, useAuth};
