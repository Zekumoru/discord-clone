import { useState } from 'react';
import { IconXMark } from '../../../assets/icons';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import IUser from '../../../types/user/User';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import FriendAction from './FriendAction';
import LoadingScreen from '../../LoadingScreen';
import { useClosePartialModal } from '../../../contexts/partial-screen-modal/PartialScreenModalContext';

type UserActionsPartialModalProps = {
  user: IUser | undefined;
};

const UserActionsPartialModal = ({ user }: UserActionsPartialModalProps) => {
  const close = useClosePartialModal();
  const [loading, setLoading] = useState(false);
  const [name] = extractNameAndTag(user?.username ?? '');

  return (
    <div className="w-full overflow-hidden rounded-t-lg bg-background-700">
      {loading && <LoadingScreen />}

      <div className="flex items-center gap-2 p-4">
        <ProfilePicture user={user} className="h-7 w-7 text-xs" />
        <span className="font-semibold">{name}</span>
        <span onClick={close} className="ml-auto text-silvergrey-300">
          <IconXMark strokeWidth={2.2} className="h-6 w-6" />
        </span>
      </div>

      <ul className="bg-background-500 font-semibold text-silvergrey-300">
        <FriendAction
          friend={user!}
          onAction={() => setLoading(true)}
          onActionSuccess={() => {
            setLoading(false);
            close();
          }}
        />
      </ul>
    </div>
  );
};

export default UserActionsPartialModal;
