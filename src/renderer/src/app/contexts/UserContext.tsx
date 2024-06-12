import { createContext, useState, ReactNode } from 'react';
import { StaticConfig } from '../config/config';

type UserContextType = {
  Email: string|null;
  Token: string|null
};

const defaultValue = {
  Email:localStorage.getItem(StaticConfig.userDataKeyString)||null,
  Token:localStorage.getItem(StaticConfig.authTokenKeyString)||null,
}
export const UserContext = createContext<UserContextType >(defaultValue);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [Email, _] = useState(defaultValue.Email);
  const [Token, __] = useState(defaultValue.Token);
  return (
    <UserContext.Provider value={{ Email,Token }}>
      {children}
    </UserContext.Provider>
  );
}
