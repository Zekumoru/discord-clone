import { format } from 'date-fns';
import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import { ScreenModalMethods } from '../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../contexts/screen-modal/components/ScreenModalToolbar';
import ProfilePicture from '../../../../pages/channels/components/ProfilePicture';
import extractNameAndTag from '../../../../utils/extractNameAndTag';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import EditBannerButton from './components/EditBannerButton';
import EditPictureButton from './components/EditPictureButton';
import BannerImage from '../../../BannerImage';

type EditProfileModalProps = {
  close: ScreenModalMethods[1];
};

const EditProfileModal = ({ close }: EditProfileModalProps) => {
  const [user] = useCurrentUser();
  const [name, tag] = extractNameAndTag(user?.username ?? '');

  return (
    <div className="mb-4">
      <ScreenModalToolbar
        leftElement={
          <ModalChevronCloseButton close={close}>
            Overview
          </ModalChevronCloseButton>
        }
      >
        Profile
      </ScreenModalToolbar>

      <BannerImage user={user} className="h-48">
        <EditBannerButton />

        <div className="absolute -bottom-12 left-4 rounded-full bg-background-300 p-2">
          <EditPictureButton />

          <ProfilePicture user={user} className="h-20 w-20 text-2xl" />
        </div>
      </BannerImage>

      <div className="mx-4 mt-14 rounded-2xl bg-background-800 py-4">
        <div className="px-4 text-xl font-bold">
          {name} <span className="font-medium text-silvergrey-300">#{tag}</span>
        </div>

        <div className="my-2.5 border-b border-background-100" />

        <div className="mx-4 mb-2.5">
          <div className="heading-2 mb-2 mt-4">Discord member since</div>
          <div>
            {user?.creationTimestamp &&
              format(user.creationTimestamp.toDate(), 'MMM d, yyyy')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
