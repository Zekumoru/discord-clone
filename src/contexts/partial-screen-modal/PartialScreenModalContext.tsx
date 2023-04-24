import { ReactNode, createContext, useContext, useState } from 'react';
import SwipeListenerProvider from '../SwipeListenerContext';
import { ChildrenProps } from '../../types/props.type';

type OpenPartialModalFn = (partialModal: ReactNode) => void;
type ClosePartialModalFn = () => void;

type PartialModalMethods = [
  open: OpenPartialModalFn,
  close: ClosePartialModalFn
];

const noop = () => {};
const PartialModalContext = createContext<PartialModalMethods>([noop, noop]);
const usePartialModal = () => useContext(PartialModalContext);

const ClosePartialModalContext = createContext<ClosePartialModalFn>(noop);
const useClosePartialModal = () => useContext(ClosePartialModalContext);

const PartialModalProvider = ({ children }: ChildrenProps) => {
  const [partialModal, setPartialModal] = useState<ReactNode>();

  const openPartialModal: OpenPartialModalFn = (partialModal) => {
    setPartialModal(partialModal);
  };

  const closePartialModal: ClosePartialModalFn = () => {
    setPartialModal(undefined);
  };

  return (
    <PartialModalContext.Provider value={[openPartialModal, closePartialModal]}>
      <ClosePartialModalContext.Provider value={closePartialModal}>
        {children}

        {partialModal && (
          <SwipeListenerProvider
            disableAlreadySwiped={true}
            onSwipeDown={(element) => {
              if (element?.scrollTop !== 0) return;
              closePartialModal();
            }}
            className="fixed bottom-0 left-0 top-0 z-[500] w-full overflow-y-auto overflow-x-hidden"
          >
            <div className="flex min-h-screen flex-col items-center bg-background-700 bg-opacity-50">
              <div
                className="min-h-[65vh] w-full flex-1"
                onClick={closePartialModal}
              />
              <div className="mb-3 h-1.5 w-16 rounded bg-silvergrey-300" />
              {partialModal}
            </div>
          </SwipeListenerProvider>
        )}
      </ClosePartialModalContext.Provider>
    </PartialModalContext.Provider>
  );
};

export default PartialModalProvider;
export { usePartialModal, useClosePartialModal };
