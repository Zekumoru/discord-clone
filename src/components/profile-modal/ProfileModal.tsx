import { useSignOut } from 'react-firebase-hooks/auth';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import ProfilePicture from '../../pages/channels/components/ProfilePicture';
import extractNameAndTag from '../../utils/extractNameAndTag';
import InsetList from '../modal-utils/InsetList';
import InsetListItem from '../modal-utils/InsetListItem';
import ProfileToolbar from './ProfileToolbar';
import AccountListItem from './components/AccountListItem';
import EditProfileListItem from './components/EditProfileListItem';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BannerImage from '../BannerImage';
import LoadingScreen from '../LoadingScreen';
import { useCloseModal } from '../../contexts/modal/ModalContext';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { useDialog } from '../dialog/Dialog';
import useIsAnonymous from '../../hooks/useIsAnonymous';

const ProfileModal = () => {
  const close = useCloseModal();
  const [user] = useCurrentUser();
  const [name, tag] = extractNameAndTag(user?.username ?? '');
  const [logout, logoutLoading] = useSignOut(getAuth());
  const [dialogRef, openDialog, closeDialog] = useDialog();
  const isAnonymous = useIsAnonymous();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    close();
    navigate('/');
  };

  return (
    <div>
      {logoutLoading && <LoadingScreen />}

      <ConfirmationDialog
        ref={dialogRef}
        title="Log out"
        confirmBtnText="Log out"
        onConfirm={handleLogout}
        onReject={closeDialog}
      >
        {!isAnonymous ? (
          <>Are you sure to sign out from Discord?</>
        ) : (
          <>
            <span className="font-bold text-salmon-400">Caution:</span> Signing
            out an anonymous account without upgrading will lose your data. Are
            you sure to log out?
          </>
        )}
      </ConfirmationDialog>

      <ProfileToolbar />

      <BannerImage user={user} className="h-48">
        <div className="absolute -bottom-12 left-4 rounded-full bg-background-800 p-2">
          <ProfilePicture user={user} className="h-20 w-20 text-2xl" />
        </div>
      </BannerImage>

      <div className="mb-6 bg-background-800 p-4 pt-14">
        <div className="text-2xl font-bold leading-6">{name}</div>
        <div className="text-xl font-medium text-silvergrey-300">#{tag}</div>
      </div>

      <InsetList className="mb-6">
        <AccountListItem />
        <EditProfileListItem />
      </InsetList>

      <ul className="border-y border-background-700">
        <InsetListItem onClick={openDialog} className="mx-auto text-salmon-100">
          Log out
        </InsetListItem>
      </ul>
    </div>
  );
};

export default ProfileModal;
