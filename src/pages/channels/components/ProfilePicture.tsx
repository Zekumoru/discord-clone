import IUser from '../../../types/user/User';
import uniqolor from 'uniqolor';
import getStringColor from '../../../utils/getStringColor';

type ProfilePictureProps = {
  user: IUser | undefined;
  className?: string;
  onClick?: () => void;
};

const ProfilePicture = ({ user, className, onClick }: ProfilePictureProps) => {
  const bgColor = getStringColor(user?.username);
  const acronyms = [];

  if (user?.username) {
    const splits = user.username.split(' ').filter(Boolean);
    acronyms.push(splits[0].substring(0, 1));
    if (splits[1]) acronyms.push(splits[1].substring(0, 1));
  }

  return (
    <span
      onClick={onClick}
      className={`grid h-10 w-10 place-content-center rounded-full bg-cover bg-center bg-no-repeat font-medium ${className}`}
      style={{
        backgroundColor: bgColor,
        backgroundImage: user?.pictureUrl ? `url(${user.pictureUrl})` : '',
      }}
    >
      {!user?.pictureUrl && acronyms.join('')}
    </span>
  );
};

export default ProfilePicture;
