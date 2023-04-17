import RoundPicture from '../../../components/RoundPicture';
import IUser from '../../../types/user/User';

type ProfilePictureProps = {
  user: IUser | undefined;
  className?: string;
  onClick?: () => void;
};

const ProfilePicture = ({ user, className, onClick }: ProfilePictureProps) => {
  return (
    <RoundPicture
      text={user?.username}
      pictureUrl={user?.pictureUrl}
      className={className}
      onClick={onClick}
    />
  );
};

export default ProfilePicture;
