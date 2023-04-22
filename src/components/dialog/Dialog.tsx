import { ReactNode, forwardRef, useRef } from 'react';

type DialogProps = {
  className?: string;
  children?: ReactNode;
};

const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
  };

  return [dialogRef, open, close] as const;
};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ className, children }, ref) => {
    return (
      <dialog
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;

          e.currentTarget.close();
        }}
        className={className}
        ref={ref}
      >
        {children}
      </dialog>
    );
  }
);

export { useDialog };
export default Dialog;
