import { ReactNode, createContext, useContext, useState } from 'react';

type PartialScreenModalMethods = [
  open: (modal: ReactNode) => void,
  close: () => void
];

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
        <div className="fixed bottom-0 left-0 top-0 z-50 w-full overflow-y-auto overflow-x-hidden">
          {modal}
        </div>
      )}
      {children}
    </PartialScreenModalContext.Provider>
  );
};

export default PartialScreenModalProvider;
export { usePartialScreenModal };
export type { PartialScreenModalMethods };
