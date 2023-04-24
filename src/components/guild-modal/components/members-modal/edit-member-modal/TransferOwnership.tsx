import { toast } from 'react-toastify';
import InsetList from '../../../../modal-utils/InsetList';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import { useDialog } from '../../../../dialog/Dialog';
import useGuildOwnerId from '../../../../../types/guild/hooks/useGuildOwnerId';
import { useGuildId } from '../../../../../types/guild/contexts/GuildIdContext';
import IUser from '../../../../../types/user/User';
import useTransferOwnership from '../../../hooks/useTransferOwnership';
import DiscordError from '../../../../../utils/DiscordError';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';
import TransferOwnershipDialog from './TransferOwnershipDialog';

type TransferOwnershipProps = {
  user: IUser | undefined;
};

const TransferOwnership = ({ user }: TransferOwnershipProps) => {
  const [dialogRef, openDialog, closeDialog] = useDialog();
  const close = useCloseModal();
  const guildId = useGuildId();
  const [guildOwnerId] = useGuildOwnerId(guildId);
  const isGuildOwner = guildOwnerId === user?.id;
  const { mutate: transferOwnership, isLoading } = useTransferOwnership({
    onSuccess: () => {
      toast.success('Ownership transferred successfully!');
      close(true);
    },
    onError: (error) => {
      if (!(error instanceof DiscordError)) {
        toast.error('Could not transfer ownership!');
        return;
      }

      toast.error(error.message);
    },
  });

  const handleTransferOwnership = () => {
    if (!guildId || !user) {
      toast.error('Could not transfer ownership!');
      return;
    }

    transferOwnership({
      guildId,
      newOwnerId: user.id,
    });
  };

  const openTransferOwnershipDialog = () => {
    if (!user) {
      toast.error('Could not transfer ownership!');
      return;
    }

    openDialog();
  };

  return (
    <>
      {user && (
        <TransferOwnershipDialog
          ref={dialogRef}
          user={user}
          loading={isLoading}
          onConfirm={handleTransferOwnership}
          onReject={closeDialog}
        />
      )}

      <InsetList className={isGuildOwner ? 'opacity-60' : ''}>
        <InsetListItem
          onClick={
            isGuildOwner !== undefined && !isGuildOwner
              ? openTransferOwnershipDialog
              : undefined
          }
          className="mx-auto text-salmon-100"
        >
          Transfer Ownership
        </InsetListItem>
      </InsetList>
    </>
  );
};

export default TransferOwnership;
