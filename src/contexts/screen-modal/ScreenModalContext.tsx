import { ReactNode, createContext, useContext, useState } from 'react';

type ScreenModalMethods = [
  open: (modal: ReactNode) => void,
  close: (propagate?: boolean) => void
];

type ScreenModalProps = {
  close: ScreenModalMethods[1];
};

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
        <div className="fixed bottom-0 left-0 top-0 z-[300] w-full overflow-y-auto bg-background-300">
          {modal}
        </div>
      )}
      {children}
    </ScreenModalContext.Provider>
  );
};

export default ScreenModalProvider;
export { useScreenModal };
export type { ScreenModalMethods, ScreenModalProps };
