import { IconCog6Tooth } from '../../../assets/icons';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import extractNameAndTag from '../../../utils/extractNameAndTag';
import { useCurrentUser } from '../../current-user/CurrentUserContext';

const SidebarProfile = () => {
  const [user] = useCurrentUser();
  const [name, tag] = extractNameAndTag(user?.username ?? '');

  return (
    <div className="col-span-2 flex items-center gap-3 border-t border-t-background-100 px-4 py-3 text-silvergrey-300">
      <ProfilePicture user={user} className="h-10 w-10 shrink-0" />

      <div className="min-w-0">
        <div className="truncate font-medium leading-none text-white">
          {name}
        </div>
        <div className="text-xs">#{tag}</div>
      </div>

      <div className="ml-auto p-2">
        <IconCog6Tooth className="h-6 w-6" />
      </div>
    </div>
  );
};

export default SidebarProfile;
