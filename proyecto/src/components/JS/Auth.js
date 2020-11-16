import React, { useEffect, useState } from "react";
import {
    useFirebaseApp,
  } from 'reactfire';
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const fb = useFirebaseApp();
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fb.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};