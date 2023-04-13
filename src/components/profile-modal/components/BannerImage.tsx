import { ReactNode } from 'react';
import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';

type BannerImageProps = {
  children?: ReactNode;
};

const BannerImage = ({ children }: BannerImageProps = {}) => {
  const [user] = useCurrentUser();

  return (
    <div
      className="relative h-48 bg-slate-700 bg-cover bg-no-repeat"
      style={{
        backgroundImage: user?.bannerUrl ? `url(${user.bannerUrl})` : '',
      }}
    >
      {children}
    </div>
  );
};

export default BannerImage;
