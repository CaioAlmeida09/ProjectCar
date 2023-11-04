import { useState, ReactNode, createContext, useEffect } from "react";
import { auth } from "../services/firebaseconection";
import { onAuthStateChanged } from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}
type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  HandleUser: ({ name, uid, email }: UserProps) => void;
  user: UserProps | null;
};

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}
export const AuthContext = createContext({} as AuthContextData);
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });
    return () => {
      unSub();
    };
  }, []);

  function HandleUser({ name, uid, email }: UserProps) {
    setUser({
      name,
      uid,
      email,
    });
  }
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingAuth,
        HandleUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
