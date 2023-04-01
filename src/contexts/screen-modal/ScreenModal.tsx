import { ReactNode, createContext, useContext, useState } from 'react';

type ScreenModalMethods = [open: (modal: ReactNode) => void, close: () => void];

const ScreenModalContext = createContext<ScreenModalMethods>(
  [] as unknown as ScreenModalMethods
);

const useScreenModal = () => {
  return useContext(ScreenModalContext);
};

type ScreenModalProviderProps = {
  children: ReactNode;
};

const ScreenModalProvider = ({ children }: ScreenModalProviderProps) => {
  const [modal, setModal] = useState<ReactNode>();

  const open = (modal: ReactNode) => {
    setModal(modal);
  };

  const close = () => {
    setModal(undefined);
  };

  return (
    <ScreenModalContext.Provider value={[open, close]}>
      {modal && (
        <div className="fixed left-0 top-0 z-50 min-h-screen w-full">
          {modal}
        </div>
      )}
      {children}
    </ScreenModalContext.Provider>
  );
};

export default ScreenModalProvider;
export { useScreenModal };
export type { ScreenModalMethods };
