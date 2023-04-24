import { toast } from 'react-toastify';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';
import ModalToolbar from '../../../../../contexts/modal/components/ModalToolbar';
import ProfilePicture from '../../../../../pages/channels/components/ProfilePicture';
import { useGuildId } from '../../../../../types/guild/contexts/GuildIdContext';
import useGuildOwnerId from '../../../../../types/guild/hooks/useGuildOwnerId';
import useUser from '../../../../../types/user/hooks/useUser';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import InsetList from '../../../../modal-utils/InsetList';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import ModalChevronCloseButton from '../../../../modal-utils/ModalChevronCloseButton';
import useTransferOwnership from '../../../hooks/useTransferOwnership';
import DiscordError from '../../../../../utils/DiscordError';
import TransferOwnershipDialog from './TransferOwnershipDialog';
import { useDialog } from '../../../../dialog/Dialog';

type EditMemberModalProps = {
  memberId: string | undefined;
};

const EditMemberModal = ({ memberId }: EditMemberModalProps) => {
  const [dialogRef, openDialog, closeDialog] = useDialog();
  const close = useCloseModal();
  const guildId = useGuildId();
  const [user] = useUser(memberId);
  const [name] = extractNameAndTag(user?.username ?? '');
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
    <div className="mb-4">
      {user && (
        <TransferOwnershipDialog
          ref={dialogRef}
          user={user}
          loading={isLoading}
          onConfirm={handleTransferOwnership}
          onReject={closeDialog}
        />
      )}

      <ModalToolbar
        leftElement={<ModalChevronCloseButton>Members</ModalChevronCloseButton>}
      >
        <span className="block w-40 truncate">Edit {name}</span>
      </ModalToolbar>

      <InsetList className="mb-8 mt-6">
        <li className="flex items-center gap-4 bg-background-500 px-4 py-3.5">
          <ProfilePicture user={user} className="flex-shrink-0" />

          <span className="truncate font-semibold text-silvergrey-300">
            {user?.username}
          </span>
        </li>
      </InsetList>

      <InsetList className={isGuildOwner ? 'opacity-60' : ''}>
        <InsetListItem
          onClick={isGuildOwner ? undefined : openTransferOwnershipDialog}
          className="mx-auto text-salmon-100"
        >
          Transfer Ownership
        </InsetListItem>
      </InsetList>
    </div>
  );
};

export default EditMemberModal;
