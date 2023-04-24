import { toast } from 'react-toastify';
import { IconCog6Tooth, IconUserPlus } from '../../../../assets/icons';
import GuildPicture from '../../../../components/GuildPicture';
import InvitePartialModal from '../../../../components/invite-partial-modal/InvitePartialModal';
import useGuild from '../../../../types/guild/hooks/useGuild';
import useMembers from '../../../../types/member/hooks/useMembers';
import {
  useClosePartialModal,
  usePartialModal,
} from '../../../partial-screen-modal/PartialScreenModalContext';
import PartialModalRoundedDiv from '../../../partial-screen-modal/components/PartialModalRoundedDiv';
import { useModal } from '../../../modal/ModalContext';
import CreateChannelModal from './create-channel/CreateChannelModal';
import CreateCategoryModal from './CreateCategoryModal';
import GuildModal from '../../../../components/guild-modal/GuildModal';
import useIsCurrentUserGuildOwner from '../../../../types/guild/hooks/useIsCurrentUserGuildOwner';
import GuildIdProvider from '../../../../types/guild/contexts/GuildIdContext';
import { useDialog } from '../../../../components/dialog/Dialog';
import ConfirmationDialog from '../../../../components/dialog/ConfirmationDialog';
import useRemoveMember from '../../../../components/guild-modal/hooks/useRemoveMember';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../../current-user/CurrentUserContext';

type GuildPartialModalProps = {
  guildId: string | undefined;
};

const GuildPartialModal = ({ guildId }: GuildPartialModalProps) => {
  const close = useClosePartialModal();
  const [dialogRef, openDialog, closeDialog] = useDialog();
  const [openPartialModal] = usePartialModal();
  const [openModal] = useModal();
  const [guild] = useGuild(guildId);
  const [members] = useMembers(guild?.membersId);
  const isGuildOwner = useIsCurrentUserGuildOwner(guildId);
  const membersLength = members?.members.length ?? 0;
  const [currentUser] = useCurrentUser();
  const navigate = useNavigate();
  const { mutate: removeMember, isLoading } = useRemoveMember({
    onSuccess: () => {
      toast.success('Server left successfully!');
      navigate('/channels/@me');
      close();
    },
    onError: () => toast.error('Could not leave server!'),
  });

  const openInvitePartialModal = () => {
    openPartialModal(<InvitePartialModal guild={guild} />);
  };

  const openGuildModal = () => {
    openModal(<GuildModal guildId={guildId} />, (children) => (
      <GuildIdProvider guildId={guildId}>{children}</GuildIdProvider>
    ));
    close();
  };

  const openCreateChannelModal = () => {
    if (!guild) {
      toast.error('Could not open channel modal!');
      return;
    }

    openModal(
      <CreateChannelModal
        categoriesId={guild.categoriesId}
        initialCategoryName={''}
      />
    );
    close();
  };

  const openCreateCategoryModal = () => {
    if (!guild) {
      toast.error('Could not open category modal!');
      return;
    }

    openModal(<CreateCategoryModal categoriesId={guild.categoriesId} />);
    close();
  };

  const handleLeaveServer = () => {
    if (!guildId || !currentUser) {
      toast.error('Could not leave server!');
      return;
    }

    removeMember({
      guildId: guildId,
      userGuildsId: currentUser?.guildsId,
    });
  };

  const openLeaveDialog = () => {
    openDialog();
  };

  return (
    <div className="min-h-[85vh] w-full overflow-hidden rounded-t-lg bg-background-300">
      <header className="bg-background-700">
        <div className="px-4 pb-2 pt-5">
          <GuildPicture
            className="mb-6 h-20 w-20 !rounded-3xl text-xl"
            guild={guild}
          />

          <h1 className="mb-2 text-2xl font-bold">{guild?.name}</h1>
          <p className="flex items-center gap-1 text-sm font-medium text-silvergrey-300">
            <span className="h-2.5 w-2.5 rounded-full bg-silvergrey-400" />
            {membersLength} Member{membersLength !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="mt-2 border-b border-background-100" />

        <div
          className={`grid px-4 py-2.5 text-silvergrey-300 ${
            isGuildOwner ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          <button
            onClick={openInvitePartialModal}
            className="flex flex-col items-center gap-1.5 p-2 font-medium"
          >
            <IconUserPlus className="h-7 w-7" />
            <div className="text-sm">Invite</div>
          </button>
          {isGuildOwner && (
            <button
              onClick={openGuildModal}
              className="flex flex-col items-center gap-1.5 p-2 font-medium"
            >
              <IconCog6Tooth className="h-7 w-7" />
              <div className="text-sm">Settings</div>
            </button>
          )}
        </div>
      </header>

      <div className="p-4">
        <PartialModalRoundedDiv className="flex flex-col gap-3 p-4 font-medium">
          <button onClick={openCreateChannelModal} className="text-left">
            Create Channel
          </button>

          <div className="border-b border-background-100" />

          <button onClick={openCreateCategoryModal} className="text-left">
            Create Category
          </button>

          {!isGuildOwner && <div className="border-b border-background-100" />}

          <ConfirmationDialog
            ref={dialogRef}
            title="Leave Server"
            loading={isLoading}
            confirmBtnText="Yes, leave"
            onConfirm={handleLeaveServer}
            onReject={closeDialog}
          >
            Leaving? You can always go back with an invite!
          </ConfirmationDialog>

          {!isGuildOwner && (
            <button
              onClick={openLeaveDialog}
              className="text-left text-salmon-100"
            >
              Leave Server
            </button>
          )}
        </PartialModalRoundedDiv>
      </div>
    </div>
  );
};

export default GuildPartialModal;
