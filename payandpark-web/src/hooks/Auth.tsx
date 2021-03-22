import React, { createContext, useCallback, useState, useContext } from 'react';


import api from '../services/api';

interface userData {
  username: string;
  email: string;
  id: string;
  mobile: string;
  roleId: number;
}
interface AuthState {
  token: string;
  user: userData;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  // user: object;
  user: userData;
  signIn(credentials: SignInCredentials): Promise<userData>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@PayAndPark:token');
    const user = localStorage.getItem('@PayAndPark:user');

    if( token && user){
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState;
  })

  const signIn = useCallback(async ({ email, password }) => {

      const response = await api.post('sessions', {
        email,
        password,
      });
  
      const { token, user } = response.data;
  
      localStorage.setItem('@PayAndPark:token', token);
      localStorage.setItem('@PayAndPark:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;
  
      setData({ token, user });

      return user;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@PayAndPark:token');
    localStorage.removeItem('@PayAndPark:user');

   

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };