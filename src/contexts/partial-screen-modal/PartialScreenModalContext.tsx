import { ReactNode, createContext, useContext, useState } from 'react';

type PartialScreenModalMethods = [
  open: (modal: ReactNode) => void,
  close: () => void
];

type PartialScreenModalProps = {
  close: PartialScreenModalMethods[1];
};

const PartialScreenModalContext = createContext<PartialScreenModalMethods>(
  [] as unknown as PartialScreenModalMethods
);

const usePartialScreenModal = () => {
  return useContext(PartialScreenModalContext);
};

type PartialScreenModalProviderProps = {
  children: ReactNode;
};

const PartialScreenModalProvider = ({
  children,
}: PartialScreenModalProviderProps) => {
  const [modal, setModal] = useState<ReactNode>();

  const open = (modal: ReactNode) => {
    setModal(modal);
  };

  const close = () => {
    setModal(undefined);
  };

  return (
    <PartialScreenModalContext.Provider value={[open, close]}>
      {modal && (
        <div className="fixed bottom-0 left-0 top-0 z-[100] w-full overflow-y-auto overflow-x-hidden">
          <div className="flex min-h-screen flex-col items-center bg-background-700 bg-opacity-50">
            <div className="min-h-[65vh] w-full flex-1" onClick={close} />
            <div className="mb-3 h-1.5 w-16 rounded bg-silvergrey-300" />
            {modal}
          </div>
        </div>
      )}
      {children}
    </PartialScreenModalContext.Provider>
  );
};

export default PartialScreenModalProvider;
export { usePartialScreenModal };
export type { PartialScreenModalMethods, PartialScreenModalProps };
