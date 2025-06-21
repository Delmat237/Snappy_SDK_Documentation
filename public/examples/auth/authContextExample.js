  const authContextExample = `// Context d'authentification React
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SnappyHTTPClient } from '@/lib/SnappyHTTPClient';
import {User} from '@/lib/models';

interface AuthContextType {
  user: User | null;
  httpClient: SnappyHTTPClient;
  login: (email: string, password: string) => Promise<void>;
  loginOrganization: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [httpClient] = useState(() => new SnappyHTTPClient(
    process.env.REACT_APP_API_URL!
  ));

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      await httpClient.loadBearerToken();
      await httpClient.loadUser();
      
      const savedUser = httpClient.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.log('Aucune session sauvegardée');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const authResult = await httpClient.authenticateUser({
        email,
        password
      });
      
      setUser(authResult.data);
    } catch (error) {
      throw error;
    }
  };

  const loginOrganization = async (email: string, password: string) => {
    try {
      const authResult = await httpClient.authenticateOrganization({
        email,
        password
      });
      
      // Pour les organisations, on peut stocker les infos différemment
      console.log('Organisation connectée:', authResult.data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Nettoyer le stockage local
      await AsyncStorage.removeItem('bearer');
      await AsyncStorage.removeItem('user');
      
      // Réinitialiser l'état
      setUser(null);
      httpClient.setBearerToken('');
      httpClient.setUser(undefined);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const value: AuthContextType = {
    user,
    httpClient,
    login,
    loginOrganization,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};`;

export default authContextExample;