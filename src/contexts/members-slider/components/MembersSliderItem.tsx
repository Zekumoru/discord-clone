import useUserPartialModal from '../../../components/user-partial-modal/hooks/useUserPartialModal';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import IMember from '../../../types/member/Member';
import useUser from '../../../types/user/hooks/useUser';
import extractNameAndTag from '../../../utils/extractNameAndTag';

type MembersSliderItemProps = {
  member: IMember | undefined;
};

const MembersSliderItem = ({ member }: MembersSliderItemProps) => {
  const [user] = useUser(member?.userId);
  const [name] = extractNameAndTag(user?.username ?? '');
  const [openUserPartialModal] = useUserPartialModal();

  return (
    <li
      onClick={() => openUserPartialModal(user?.id)}
      className="h-15 flex items-center gap-2.5"
    >
      <ProfilePicture className="h-9 w-9 shrink-0" user={user} />
      <div className="truncate font-medium">{name}</div>
    </li>
  );
};

export default MembersSliderItem;
