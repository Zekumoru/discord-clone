import IUser from '../../../../../types/user/User';
import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import ProfilePicture from '../../../components/ProfilePicture';

type MentionUserItemProps = {
  user: IUser;
  onClick?: (user: IUser) => void;
};

const MentionUserItem = ({ user, onClick }: MentionUserItemProps) => {
  const [name, tag] = extractNameAndTag(user.username);

  return (
    <li
      onClick={() => onClick?.(user)}
      className="flex items-center rounded px-2.5 py-1.5"
    >
      <ProfilePicture user={user} className="mr-2 h-8 w-8" />
      <span>{name}</span>
      <span className="text-silvergrey-400">#{tag}</span>
    </li>
  );
};

export default MentionUserItem;
