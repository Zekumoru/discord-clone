import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import IUser from '../../../types/user/User';
import { IconEllipsisHorizontal } from '../../../assets/icons';
import { usePartialScreenModal } from '../../../contexts/partial-screen-modal/PartialScreenModalContext';
import UserActionsPartialModal from './UserActionsPartialModal';
import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';

type UserPartialModalBannerProps = {
  user: IUser | undefined;
};

const UserPartialModalBanner = ({ user }: UserPartialModalBannerProps) => {
  const [currentUser] = useCurrentUser();
  const [openPartialModal, closePartialModal] = usePartialScreenModal();

  const openRemoveFriendModal = () => {
    openPartialModal(
      <UserActionsPartialModal user={user} close={closePartialModal} />
    );
  };

  return (
    <div className="relative mb-11 h-28 bg-slate-600">
      <div className="absolute left-4 top-16 rounded-full bg-background-500 p-2">
        <ProfilePicture className="h-20 w-20 text-2xl" user={user} />
      </div>

      {currentUser?.id !== user?.id && (
        <div
          onClick={openRemoveFriendModal}
          className="absolute right-4 top-4 rounded-full bg-background-300 p-0.5"
        >
          <IconEllipsisHorizontal className="h-6 w-6" />
        </div>
      )}
    </div>
  );
};

export default UserPartialModalBanner;
