import React, { useContext } from 'react';
import { useAuthToken } from "../../hooks/useAuthToken";

interface AuthContextValues {
    token: string | null;
    login: (token:string)=> void;
    logoutJo: () => void;
}

const AuthContext = React.createContext<AuthContextValues | undefined>(undefined);

const AuthProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [token, setToken ] = useAuthToken();

    const login = (token: string) => {
        setToken(token);
      };
    
      const logout = () => {
        setToken(null);
      };
    
      const authContextValues: AuthContextValues = {
        token: token,
        login: login,
        logoutJo: logout,
      };
    
      return (
      <AuthContext.Provider value={authContextValues}>
        {children}
        </AuthContext.Provider>
      )  
    }
    
    const useAuth =() => {
      return useContext(AuthContext);
    }

export { AuthProvider, useAuth };