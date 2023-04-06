import React from 'react';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import IUser from '../../../types/user/User';

type UserPartialModalBannerProps = {
  user: IUser | undefined;
};

const UserPartialModalBanner = ({ user }: UserPartialModalBannerProps) => {
  return (
    <div className="relative mb-11 h-20 bg-slate-600">
      <div className="absolute left-4 top-8 rounded-full bg-background-500 p-2">
        <ProfilePicture className="h-20 w-20 text-2xl" user={user} />
      </div>
    </div>
  );
};

export default UserPartialModalBanner;
