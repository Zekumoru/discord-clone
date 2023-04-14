import { ReactNode } from 'react';
import getStringColor from '../../../utils/getStringColor';
import IUser from '../../../types/user/User';

type BannerImageProps = {
  user: IUser | undefined;
  className?: string;
  children?: ReactNode;
};

const BannerImage = ({ user, className, children }: BannerImageProps) => {
  const bgColor = getStringColor(user?.username);

  return (
    <div
      className={`relative bg-cover bg-no-repeat ${className ?? ''}`}
      style={{
        backgroundColor: bgColor,
        backgroundImage: user?.bannerUrl ? `url(${user.bannerUrl})` : '',
      }}
    >
      {children}
    </div>
  );
};

export default BannerImage;
