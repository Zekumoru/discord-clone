import { forwardRef } from 'react';
import Dialog from '../../../../dialog/Dialog';
import LoadingScreen from '../../../../LoadingScreen';
import IUser from '../../../../../types/user/User';
import { useGuildId } from '../../../../../types/guild/contexts/GuildIdContext';
import useGuild from '../../../../../types/guild/hooks/useGuild';

type TransferOwnershipDialogProps = {
  user: IUser;
  loading?: boolean;
  onConfirm?: () => void;
  onReject?: () => void;
};

const TransferOwnershipDialog = forwardRef<
  HTMLDialogElement,
  TransferOwnershipDialogProps
>(({ onConfirm, onReject, loading, user }, ref) => {
  const guildId = useGuildId();
  const [guild] = useGuild(guildId);

  return (
    <Dialog className="rounded-md p-4" ref={ref}>
      {loading && <LoadingScreen />}

      <header className="text-lg font-bold">Transfer Ownership?</header>

      <div className="my-4 border-b-2 border-background-100" />

      <p className="mb-4 text-base">
        By transferring ownership, you are relinquishing further access and
        modification to{' '}
        <span className="font-semibold">{guild?.name ?? 'this server'}</span>'s{' '}
        settings.
      </p>

      <p className="mb-4 text-base">
        Are you sure to transfer ownership to{' '}
        <span className="font-semibold">{user.username}</span>?
      </p>

      <button onClick={onConfirm} className="dialog-btn mb-2 bg-salmon-400">
        Yes
      </button>
      <button onClick={onReject} className="dialog-btn-outline">
        No
      </button>
    </Dialog>
  );
});

export default TransferOwnershipDialog;
