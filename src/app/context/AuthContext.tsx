import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'veterinario' | 'administrador' | 'propietario';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
  organizationName: string;
}

interface AuthContextType {
  user: User | null;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Dr. Carlos Mendoza',
    email: 'cmendoza@vetcali.com',
    role: 'veterinario',
    organizationId: 'org-1',
    organizationName: 'Clínica Veterinaria Cali Sur',
  });

  const switchRole = (role: UserRole) => {
    const roleData = {
      veterinario: {
        name: 'Dr. Carlos Mendoza',
        email: 'cmendoza@vetcali.com',
      },
      administrador: {
        name: 'Ana María López',
        email: 'alopez@vetcali.com',
      },
      propietario: {
        name: 'Juan Pérez',
        email: 'jperez@email.com',
      },
    };

    setUser({
      ...user!,
      role,
      name: roleData[role].name,
      email: roleData[role].email,
    });
  };

  return (
    <AuthContext.Provider value={{ user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
