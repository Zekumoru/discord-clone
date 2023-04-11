import { IconXMark } from '../../../assets/icons';
import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';
import { PartialScreenModalMethods } from '../../../contexts/partial-screen-modal/PartialScreenModalContext';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import useSendFriendRequest from '../../../pages/channels/pages/friends/components/add-friend-screen-modal/hooks/use-add-friend/useSendFriendRequest';
import useIsFriend from '../../../types/friend/hooks/useIsFriend';
import IUser from '../../../types/user/User';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import useRemoveFriend from '../hooks/useRemoveFriend';

type UserActionsPartialModalProps = {
  user: IUser | undefined;
  close: PartialScreenModalMethods[1];
};

const UserActionsPartialModal = ({
  user,
  close,
}: UserActionsPartialModalProps) => {
  const [name] = extractNameAndTag(user?.username ?? '');
  const [currentUser] = useCurrentUser();
  const [isFriend] = useIsFriend(user?.id);
  const { mutate: sendFriendRequest } = useSendFriendRequest({
    onSuccess: close,
  });
  const { mutate: removeFriend } = useRemoveFriend({
    onSuccess: close,
  });

  const handleSendFriendRequest = () => {
    sendFriendRequest(user!.username);
  };

  const handleRemoveFriend = () => {
    removeFriend({
      currentUser: currentUser!,
      friendToRemove: user!,
    });
  };

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
        {isFriend ? (
          <li onClick={handleRemoveFriend} className="p-4 text-salmon-100">
            Remove Friend
          </li>
        ) : (
          <li onClick={handleSendFriendRequest} className="p-4">
            Add Friend
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserActionsPartialModal;
