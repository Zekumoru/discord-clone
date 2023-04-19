import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';
import PartialModalRoundedDiv from '../../../contexts/partial-screen-modal/components/PartialModalRoundedDiv';
import IUser from '../../../types/user/User';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import MessageIconBtn from './MessageIconBtn';

type InfoAndActionsProps = {
  user: IUser | undefined;
  onMessageIconClick: () => void;
};

const InfoAndActions = ({ user, onMessageIconClick }: InfoAndActionsProps) => {
  const [currentUser] = useCurrentUser();
  const [name, tag] = extractNameAndTag(user?.username ?? '');
  const isSelf = currentUser?.id === user?.id;

  const handleMessageIconClick = () => {
    if (isSelf) return;

    onMessageIconClick();
  };

  return (
    <PartialModalRoundedDiv className="py-4">
      <div className="px-4 text-xl font-semibold">
        <span className="">{name}</span>{' '}
        <span className="font-medium text-silvergrey-300">#{tag}</span>
      </div>

      <div className="my-2.5 border-b border-background-500" />

      <div className="mt-2 flex justify-center px-4 text-silvergrey-300">
        <MessageIconBtn
          isSelf={isSelf}
          onMessageIconClick={handleMessageIconClick}
        />
      </div>
    </PartialModalRoundedDiv>
  );
};

export default InfoAndActions;
