// import { createContext, useContext, useState, ReactNode } from 'react';

// interface User {
//   name: string;
//   role: string;
//   initials: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (username: string, password: string) => boolean;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (username: string, password: string) => {
//     if (username === 'admin' && password === 'admin123') {
//       setUser({
//         name: 'John Doe',
//         role: 'Admin',
//         initials: 'JD'
//       });
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };



import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface User {
  name: string;
  role: string;
  initials: string;
  pages?: string;
}


interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage on initial load
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      try {
        return JSON.parse(savedSession);
      } catch (error) {
        console.error('Error parsing saved session:', error);
        localStorage.removeItem('userSession');
        return null;
      }
    }
    return null;
  });


  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('userSession', JSON.stringify(user));
    } else {
      localStorage.removeItem('userSession');
    }
  }, [user]);


  const login = (username: string, password: string) => {
    // Fallback for demo credentials
    if (username === 'admin' && password === 'admin123') {
      const userData = {
        name: 'John Doe',
        role: 'Admin',
        initials: 'JD'
      };
      setUser(userData);
      return true;
    }
    return false;
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('userSession');
  };


  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
