import { toast } from 'react-toastify';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import IUser from '../../../../../types/user/User';
import ConfirmationDialog from '../../../../dialog/ConfirmationDialog';
import { useDialog } from '../../../../dialog/Dialog';
import InsetList from '../../../../modal-utils/InsetList';
import InsetListItem from '../../../../modal-utils/InsetListItem';
import useRemoveMember from '../../../hooks/useRemoveMember';
import { useCloseModal } from '../../../../../contexts/modal/ModalContext';
import { useGuildId } from '../../../../../types/guild/contexts/GuildIdContext';

type KickUserProps = {
  user: IUser | undefined;
  className?: string;
};

const KickUser = ({ user, className }: KickUserProps) => {
  const close = useCloseModal();
  const [dialogRef, openDialog, closeDialog] = useDialog();
  const guildId = useGuildId();
  const [currentUser] = useCurrentUser();
  const isCurrentUser = user && user?.id === currentUser?.id;
  const { mutate: removeMember, isLoading } = useRemoveMember({
    onSuccess: () => {
      toast.success('User has been kicked from the server!');
      close();
    },
    onError: () => toast.error('Could not kick user!'),
  });

  const handleKickUser = () => {
    if (!guildId || !user) {
      toast.error('Could not kick user!');
      return;
    }

    removeMember({
      guildId,
      userGuildsId: user.guildsId,
    });
  };

  const openKickUserDialog = () => {
    if (!user) {
      toast.error('Could not kick user!');
      return;
    }

    openDialog();
  };

  return (
    <>
      {user && (
        <ConfirmationDialog
          ref={dialogRef}
          title="Kick User?"
          loading={isLoading}
          onConfirm={handleKickUser}
          onReject={closeDialog}
        >
          <span className="font-semibold">{user.username}</span> can still join
          with an invite. Are you sure to kick this member?
        </ConfirmationDialog>
      )}

      <InsetList
        className={`${isCurrentUser ? 'opacity-60' : ''} ${className ?? ''}`}
      >
        <InsetListItem
          onClick={
            isCurrentUser !== undefined && !isCurrentUser
              ? openKickUserDialog
              : undefined
          }
          className="mx-auto text-salmon-100"
        >
          Kick User
        </InsetListItem>
      </InsetList>
    </>
  );
};

export default KickUser;
