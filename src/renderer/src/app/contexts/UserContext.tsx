import { createContext, useState, ReactNode, useEffect } from 'react';
import { StaticConfig } from '../config/config';
import { UserModel } from '../modules/user/model/Model';
import { CarService } from '../modules/car/service/Service';

type UserContextType = {
  Id: number | null;
  Token: string | null
};

const defaultValue = {
  Id: Number(localStorage.getItem(StaticConfig.userDataKeyString)) || null,
  Token: localStorage.getItem(StaticConfig.authTokenKeyString) || null,
}
export const UserContext = createContext<UserContextType>(defaultValue);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [Id, _] = useState(defaultValue.Id);
  const [Token, __] = useState(defaultValue.Token);

  return (
    <UserContext.Provider value={{ Id, Token }}>
      {children}
    </UserContext.Provider>
  );
}
