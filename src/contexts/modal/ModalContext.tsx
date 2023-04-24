import { ReactNode, createContext, useContext, useState } from 'react';
import PartialModalProvider from '../partial-screen-modal/PartialScreenModalContext';

type WrapModalFn = (children: ReactNode) => ReactNode;
type OpenModalFn = (modal: ReactNode, wrap?: WrapModalFn) => void;
type CloseModalFn = (propagate?: boolean) => void;

type ModalMethods = [open: OpenModalFn, close: CloseModalFn];

const noop = () => {};
const ModalContext = createContext<ModalMethods>([noop, noop]);
const useModal = () => useContext(ModalContext);

const CloseModalContext = createContext<CloseModalFn>(noop);
const useCloseModal = () => useContext(CloseModalContext);

type ModalProviderProps = {
  close?: CloseModalFn;
  children: ReactNode;
};

const ModalProvider = ({ children, close }: ModalProviderProps) => {
  const [modal, setModal] = useState<ReactNode>();
  const [_, closePrevious] = useModal();
  const [wrap, setWrap] = useState<WrapModalFn>();

  const openModal: OpenModalFn = (modal, wrap) => {
    setModal(modal);
    setWrap(() => wrap);
  };

  const closeModal: CloseModalFn = (propagate) => {
    setModal(undefined);
    setWrap(undefined);

    if (propagate) closePrevious(propagate);
  };

  let content: ReactNode = (
    <PartialModalProvider>
      {children}

      {modal && (
        <ModalProvider close={closeModal}>
          <div className="fixed bottom-0 left-0 top-0 z-[300] w-full overflow-y-auto overflow-x-hidden bg-background-300">
            {modal}
          </div>
        </ModalProvider>
      )}
    </PartialModalProvider>
  );

  if (wrap) {
    content = wrap(content);
  }

  return (
    <ModalContext.Provider value={[openModal, closeModal]}>
      <CloseModalContext.Provider value={close ?? noop}>
        {content}
      </CloseModalContext.Provider>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
export { useModal, useCloseModal };
