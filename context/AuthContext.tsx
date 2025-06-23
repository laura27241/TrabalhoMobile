import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  email: string;
  senha: string;
};

type AuthContextType = {
  users: User[];
  register: (email: string, senha: string) => boolean; // retorna true se cadastro OK, false se já existe
  login: (email: string, senha: string) => boolean;    // retorna true se login OK, false se errado
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([
    { email: 'user1@example.com', senha: '123456' },
    { email: 'user2@example.com', senha: 'abcdef' },
  ]);

  function register(email: string, senha: string): boolean {
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    setUsers(prev => [...prev, { email, senha }]);
    return true;
  }

  function login(email: string, senha: string): boolean {
    return users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha);
  }

  return (
    <AuthContext.Provider value={{ users, register, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
