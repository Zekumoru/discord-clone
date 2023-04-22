import { ReactNode, forwardRef } from 'react';
import Dialog from './Dialog';
import LoadingScreen from '../LoadingScreen';

type ConfirmationDialogProps = {
  title?: ReactNode;
  children?: ReactNode;
  loading?: boolean;
  onConfirm?: () => void;
  onReject?: () => void;
};

const ConfirmationDialog = forwardRef<
  HTMLDialogElement,
  ConfirmationDialogProps
>(({ onConfirm, onReject, title, children, loading }, ref) => {
  return (
    <Dialog className="rounded-md p-4" ref={ref}>
      {loading && <LoadingScreen />}

      <header className="text-lg font-bold">{title}</header>

      <div className="my-4 border-b-2 border-background-100" />

      <p className="mb-4 text-base">{children}</p>

      <button onClick={onConfirm} className="dialog-btn mb-2 bg-salmon-400">
        Yes
      </button>
      <button onClick={onReject} className="dialog-btn-outline">
        No
      </button>
    </Dialog>
  );
});

export default ConfirmationDialog;
