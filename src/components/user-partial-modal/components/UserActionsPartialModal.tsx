import { IconXMark } from '../../../assets/icons';
import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';
import { PartialScreenModalMethods } from '../../../contexts/partial-screen-modal/PartialScreenModalContext';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import useSendFriendRequest from '../../../pages/channels/pages/friends/components/add-friend-screen-modal/hooks/use-add-friend/useSendFriendRequest';
import useRemoveFriendRequest from '../../../pages/channels/pages/friends/hooks/useRemoveFriendRequest';
import useIsFriend from '../../../types/friend/hooks/useIsFriend';
import useFriendRequest from '../../../types/friend/hooks/useFriendRequest';
import IUser from '../../../types/user/User';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import useRemoveFriend from '../hooks/useRemoveFriend';
import useAcceptFriend from '../../../pages/channels/pages/friends/hooks/useAcceptFriend';
import FriendAction from './FriendAction';

type UserActionsPartialModalProps = {
  user: IUser | undefined;
  close: PartialScreenModalMethods[1];
};

const UserActionsPartialModal = ({
  user,
  close,
}: UserActionsPartialModalProps) => {
  const [name] = extractNameAndTag(user?.username ?? '');

  return (
    <div className="w-full overflow-hidden rounded-t-lg bg-background-700">
      <div className="flex items-center gap-2 p-4">
        <ProfilePicture user={user} className="h-7 w-7 text-xs" />
        <span className="font-semibold">{name}</span>
        <span onClick={close} className="ml-auto text-silvergrey-300">
          <IconXMark strokeWidth={2.2} className="h-6 w-6" />
        </span>
      </div>

      <ul className="bg-background-500 font-semibold text-silvergrey-300">
        <FriendAction friend={user!} onActionSuccess={close} />
      </ul>
    </div>
  );
};

export default UserActionsPartialModal;
