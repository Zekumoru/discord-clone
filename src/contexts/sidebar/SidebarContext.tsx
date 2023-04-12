import { ReactNode, createContext, useContext, useState } from 'react';
import Sidebar from './components/Sidebar';

type SidebarMethods = [open: () => void, close: () => void];

const SidebarContext = createContext<SidebarMethods>(
  [] as unknown as SidebarMethods
);

const SidebarIsOpenContext = createContext(false);

const useSidebar = () => {
  return useContext(SidebarContext);
};

const useSidebarIsOpen = () => {
  return useContext(SidebarIsOpenContext);
};

type SidebarProviderProps = {
  children: ReactNode;
};

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider value={[open, close]}>
      <SidebarIsOpenContext.Provider value={isOpen}>
        <Sidebar isOpen={isOpen} close={close} />
        <div className={`relative ${isOpen ? 'left-80' : ''}`}>{children}</div>
      </SidebarIsOpenContext.Provider>
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
export { useSidebar, useSidebarIsOpen };
