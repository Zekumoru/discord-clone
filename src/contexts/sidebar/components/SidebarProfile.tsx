import { IconCog6Tooth } from '../../../assets/icons';
import ProfileModal from '../../../components/profile-modal/ProfileModal';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import { useCurrentUser } from '../../current-user/CurrentUserContext';
import { useScreenModal } from '../../screen-modal/ScreenModalContext';

const SidebarProfile = () => {
  const [user] = useCurrentUser();
  const [name, tag] = extractNameAndTag(user?.username ?? '');
  const [openModal, closeModal] = useScreenModal();

  const handleOpenProfileModal = () => {
    openModal(<ProfileModal close={closeModal} />);
  };

  return (
    <div className="col-span-2 flex items-center gap-3 border-t border-t-background-100 px-4 py-3 text-silvergrey-300">
      <ProfilePicture
        user={user}
        className="h-10 w-10 shrink-0 text-lg text-white"
      />

      <div className="min-w-0">
        <div className="truncate font-medium leading-none text-white">
          {name}
        </div>
        <div className="text-xs">#{tag}</div>
      </div>

      <div onClick={handleOpenProfileModal} className="ml-auto p-2">
        <IconCog6Tooth className="h-6 w-6" />
      </div>
    </div>
  );
};

export default SidebarProfile;
