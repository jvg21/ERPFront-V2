import { createContext, useState, ReactNode, useEffect } from 'react';
import { StaticConfig } from '../config/config';
import { UserService } from '../modules/user/service/Service';
import { UserModel } from '../modules/user/model/Model';

type UserContextType = {
  Id: number | null;
  Token: string | null;
  UserData: Partial<UserModel>;
};

const defaultValue: UserContextType = {
  Id: Number(localStorage.getItem(StaticConfig.userDataKeyString)) || null,
  Token: localStorage.getItem(StaticConfig.authTokenKeyString) || null,
  UserData: {}
};

export const UserContext = createContext<UserContextType>(defaultValue);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [Id, _] = useState(defaultValue.Id);
  const [Token, __] = useState(defaultValue.Token);
  const [UserData, setUserData] = useState<Partial<UserModel>>(defaultValue.UserData);

  useEffect(() => {
    const fetchUserData = async () => {
      if (Id) {
        const response = await new UserService().getById(Id);
        setUserData(response || {});
      }
    };
    fetchUserData();
  }, [Id]);


  return (
    <UserContext.Provider value={{ Id, Token, UserData }}>
      {children}
    </UserContext.Provider>
  );
}
