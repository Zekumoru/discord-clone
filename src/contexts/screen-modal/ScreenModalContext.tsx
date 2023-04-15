import { ReactNode, createContext, useContext, useState } from 'react';

type ScreenModalMethods = [
  open: (modal: ReactNode) => void,
  close: (propagate?: boolean) => void
];

const ScreenModalContext = createContext<ScreenModalMethods>(
  [] as unknown as ScreenModalMethods
);

const useScreenModal = () => {
  return useContext(ScreenModalContext);
};

type ScreenModalProviderProps = {
  children: ReactNode;
  previousCloseFn?: ScreenModalMethods[1];
};

const ScreenModalProvider = ({
  children,
  previousCloseFn,
}: ScreenModalProviderProps) => {
  const [modal, setModal] = useState<ReactNode>();

  const open = (modal: ReactNode) => {
    setModal(modal);
  };

  const close = (propagate?: boolean) => {
    setModal(undefined);

    if (typeof propagate === 'boolean' && propagate) {
      previousCloseFn?.(propagate);
    }
  };

  return (
    <ScreenModalContext.Provider value={[open, close]}>
      {modal && (
        <div className="fixed left-0 top-0 z-[300] min-h-screen w-full">
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
