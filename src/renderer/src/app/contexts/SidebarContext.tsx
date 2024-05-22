import { createContext, useState, ReactNode, useContext } from 'react';

type SidebarContextType = {
  isSidebarActive: boolean;
  setSidebarActive: (isActive: boolean) => void;
};

const defaultValue = {
  isSidebarActive:true,
  setSidebarActive:(_:boolean)=>{},
}

const SidebarContext = createContext<SidebarContextType >(defaultValue);

export function SidebarContextProvider({ children }: { children: ReactNode }) {
  const [isSidebarActive, setSidebarActive] = useState<boolean>(defaultValue.isSidebarActive);

  return (
    <SidebarContext.Provider value={{ isSidebarActive, setSidebarActive }}>
      {children}
    </SidebarContext.Provider>
  );
}
export const useSidebar = useContext(SidebarContext)