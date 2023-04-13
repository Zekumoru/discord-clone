import { useSignOut } from 'react-firebase-hooks/auth';
import {
  IconChevronRight,
  IconPencil,
  IconUserCircle,
} from '../../assets/icons';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import ScreenModalProvider, {
  ScreenModalMethods,
} from '../../contexts/screen-modal/ScreenModalContext';
import ProfilePicture from '../../pages/channels/components/ProfilePicture';
import extractNameAndTag from '../../utils/extractNameAndTag';
import InsetList from '../modal-utils/InsetList';
import InsetListItem from '../modal-utils/InsetListItem';
import ProfileToolbar from './ProfileToolbar';
import AccountListItem from './components/AccountListItem';
import EditProfileListItem from './components/EditProfileListItem';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BannerImage from './components/BannerImage';

type ProfileModalProps = {
  close: ScreenModalMethods[1];
};

const ProfileModal = ({ close }: ProfileModalProps) => {
  const [user] = useCurrentUser();
  const [name, tag] = extractNameAndTag(user?.username ?? '');
  const [logout] = useSignOut(getAuth());
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    close();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background-300">
      <ProfileToolbar close={close} />

      <BannerImage>
        <div className="absolute -bottom-12 left-4 rounded-full bg-background-800 p-2">
          <ProfilePicture user={user} className="h-20 w-20 text-2xl" />
        </div>
      </BannerImage>

      <div className="mb-6 bg-background-800 p-4 pt-14">
        <div className="text-2xl font-bold leading-6">{name}</div>
        <div className="text-xl font-medium text-silvergrey-300">#{tag}</div>
      </div>

      <ScreenModalProvider>
        <InsetList className="mb-6">
          <AccountListItem />
          <EditProfileListItem />
        </InsetList>
      </ScreenModalProvider>

      <ul className="border-y border-background-700">
        <InsetListItem
          onClick={handleLogout}
          className="mx-auto text-salmon-100"
        >
          Log out
        </InsetListItem>
      </ul>
    </div>
  );
};

export default ProfileModal;
