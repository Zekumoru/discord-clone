import { IconChevronRight } from '../../../../assets/icons';
import ProfilePicture from '../../../../pages/channels/components/ProfilePicture';
import IUser from '../../../../types/user/User';
import extractNameAndTag from '../../../../utils/extractNameAndTag';

type MemberItemProps = {
  user: IUser;
};

const MemberItem = ({ user }: MemberItemProps) => {
  const [name, tag] = extractNameAndTag(user?.username ?? '');

  return (
    <li className="flex items-center">
      <div className="px-4">
        <ProfilePicture user={user} className="h-8 w-8" />
      </div>

      <div className="flex flex-1 items-center gap-2 overflow-hidden border-b-2 border-background-100 py-3 pr-2 text-silvergrey-100">
        <div className="flex-1 truncate font-semibold">
          {name}
          <span className="font-medium text-silvergrey-400">#{tag}</span>
        </div>
        <IconChevronRight
          className="h-4 w-4 flex-shrink-0 text-silvergrey-300"
          strokeWidth={3}
        />
      </div>
    </li>
  );
};

export default MemberItem;
