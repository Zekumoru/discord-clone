import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import useRandomWidth from '../../../components/useRandomWidth';

const SidebarFriendLoadingItem = () => {
  const width = useRandomWidth();

  return (
    <li className={`flex items-center gap-3 px-2.5 py-1.5`}>
      <ProfilePicture
        user={undefined}
        className="h-9 w-9 shrink-0 text-sm text-white"
      />

      <div
        style={{ width: `${width}%` }}
        className="skeleton-loading h-5 rounded-full"
      />
    </li>
  );
};

export default SidebarFriendLoadingItem;
