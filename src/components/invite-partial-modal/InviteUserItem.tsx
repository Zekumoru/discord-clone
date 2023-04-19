import { toast } from 'react-toastify';
import ProfilePicture from '../../pages/channels/components/ProfilePicture';
import useSendInvite from '../../types/invite/hooks/useSendInvite';
import IUser from '../../types/user/User';
import extractNameAndTag from '../../utils/extractNameAndTag';
import IInvite from '../../types/invite/Invite';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import LoadingScreen from '../LoadingScreen';
import { useState } from 'react';

type InviteUserItemProps = {
  user: IUser;
  invite: IInvite | undefined;
};

const InviteUserItem = ({ user, invite }: InviteUserItemProps) => {
  const [currentUser] = useCurrentUser();
  const [name, tag] = extractNameAndTag(user.username);
  const [sent, setSent] = useState(false);
  const { mutate: sendInvite, isLoading } = useSendInvite({
    onSuccess: () => setSent(true),
    onError: () => toast.error('Could not send invite!'),
  });

  const handleSendInvite = () => {
    if (!invite || !currentUser) {
      toast.error('Could not send invite!');
      return;
    }

    sendInvite({
      inviteId: invite.id,
      inviterId: currentUser.id,
      inviteeId: user.id,
    });
  };

  return (
    <li
      className={`mb-2.5 flex items-center gap-4 font-medium last-of-type:mb-0`}
    >
      {isLoading && <LoadingScreen />}

      <ProfilePicture user={user} className="h-9 w-9 shrink-0" />

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="truncate">
          <span className="text-white">{name}</span>
          <span>#{tag}</span>
        </div>

        {sent ? (
          <div className="ml-auto text-silvergrey-400">Sent</div>
        ) : (
          <button
            onClick={handleSendInvite}
            className="ml-auto rounded-sm bg-background-100 px-4 py-1.5 text-sm font-semibold text-white"
          >
            Invite
          </button>
        )}
      </div>
    </li>
  );
};

export default InviteUserItem;
