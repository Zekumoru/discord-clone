import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import useRandomWidth from '../../../components/useRandomWidth';

const MembersSliderLoadingItem = () => {
  const width = useRandomWidth();

  return (
    <li className="h-15 flex items-center gap-2.5">
      <ProfilePicture className="h-9 w-9 shrink-0" user={undefined} />
      <div
        style={{ width: `${width}%` }}
        className="skeleton-loading h-5 rounded-full"
      />
    </li>
  );
};

export default MembersSliderLoadingItem;
