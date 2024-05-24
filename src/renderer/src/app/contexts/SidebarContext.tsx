import { createContext, useState, ReactNode } from 'react';

type SidebarContextType = {
  isSidebarActive: boolean;
  setSidebarActive: (isActive: boolean) => void;
};

const defaultValue = {
  isSidebarActive:true,
  setSidebarActive:(_:boolean)=>{},
}

export const SidebarContext = createContext<SidebarContextType >(defaultValue);

export function SidebarContextProvider({ children }: { children: ReactNode }) {
  const [isSidebarActive, setSidebarActive] = useState<boolean>(defaultValue.isSidebarActive);

  return (
    <SidebarContext.Provider value={{ isSidebarActive, setSidebarActive }}>
      {children}
    </SidebarContext.Provider>
  );
}