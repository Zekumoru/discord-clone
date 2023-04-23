import { toast } from 'react-toastify';
import { IconCog6Tooth } from '../../../assets/icons';
import ProfileModal from '../../../components/profile-modal/ProfileModal';
import UserPartialModal from '../../../components/user-partial-modal/UserPartialModal';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import { useCurrentUser } from '../../current-user/CurrentUserContext';
import { usePartialModal } from '../../partial-screen-modal/PartialScreenModalContext';
import { useModal } from '../../modal/ModalContext';

type SidebarProfileProps = {
  isOpen: boolean;
};

const SidebarProfile = ({ isOpen }: SidebarProfileProps) => {
  const [user] = useCurrentUser();
  const [name, tag] = extractNameAndTag(user?.username ?? '');
  const [openModal] = useModal();
  const [openPartialModal] = usePartialModal();

  const handleOpenUserPartialModal = () => {
    if (!user) {
      toast.error('Could not open user modal!');
      return;
    }

    openPartialModal(<UserPartialModal userId={user.id} />);
  };

  const handleOpenProfileModal = () => {
    openModal(<ProfileModal />);
  };

  return (
    <>
      <div className="h-sidebar-profile col-span-2" />

      <div
        className={`${
          isOpen ? '' : 'hidden'
        } w-sidebar h-sidebar-profile fixed bottom-0 left-0 flex items-center gap-3 border-t border-t-background-100 bg-background-500 px-4 py-3 text-silvergrey-300`}
      >
        <ProfilePicture
          onClick={handleOpenUserPartialModal}
          user={user}
          className="h-10 w-10 shrink-0 text-lg text-white"
        />

        <div onClick={handleOpenUserPartialModal} className="min-w-0">
          <div className="truncate font-medium leading-none text-white">
            {name}
          </div>
          <div className="text-xs">#{tag}</div>
        </div>

        <div onClick={handleOpenProfileModal} className="ml-auto p-2">
          <IconCog6Tooth className="h-6 w-6" />
        </div>
      </div>
    </>
  );
};

export default SidebarProfile;
