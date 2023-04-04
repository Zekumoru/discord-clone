import IUser from '../../../types/user/User';
import uniqolor from 'uniqolor';

type ProfilePictureProps = {
  user: IUser | undefined;
};

const ProfilePicture = ({ user }: ProfilePictureProps) => {
  const bgColor = uniqolor(user?.username ?? '', {
    saturation: [30, 40],
    lightness: [25, 40],
  });

  const acronyms = [];
  if (user?.username) {
    const splits = user.username.split(' ').filter(Boolean);
    acronyms.push(splits[0].substring(0, 1));
    if (splits[1]) acronyms.push(splits[1].substring(0, 1));
  }

  return (
    <span
      className="grid h-10 w-10 place-content-center rounded-full bg-cover bg-center bg-no-repeat font-medium"
      style={{
        backgroundColor: bgColor.color,
        backgroundImage: user?.pictureUrl ? `url(${user.pictureUrl})` : '',
      }}
    >
      {!user?.pictureUrl && acronyms.join('')}
    </span>
  );
};

export default ProfilePicture;
