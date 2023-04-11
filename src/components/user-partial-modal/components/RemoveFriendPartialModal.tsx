import { IconXMark } from '../../../assets/icons';
import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';
import { PartialScreenModalMethods } from '../../../contexts/partial-screen-modal/PartialScreenModalContext';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import IUser from '../../../types/user/User';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import useRemoveFriend from '../hooks/useRemoveFriend';

type RemoveFriendPartialModalProps = {
  user: IUser | undefined;
  close: PartialScreenModalMethods[1];
};

const RemoveFriendPartialModal = ({
  user,
  close,
}: RemoveFriendPartialModalProps) => {
  const [currentUser] = useCurrentUser();
  const { mutate: removeFriend } = useRemoveFriend({
    onSuccess: () => close(),
  });
  const [name] = extractNameAndTag(user?.username ?? '');

  const handleRemoveFriend = async () => {
    await removeFriend({
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
        <li onClick={handleRemoveFriend} className="p-4 text-salmon-100">
          Remove Friend
        </li>
      </ul>
    </div>
  );
};

export default RemoveFriendPartialModal;
