import { useMemo } from 'react';
import { IconCrown } from '../../../assets/icons';
import useUserPartialModal from '../../../components/user-partial-modal/hooks/useUserPartialModal';
import ProfilePicture from '../../../pages/channels/components/ProfilePicture';
import { useGuildFromProvider } from '../../../types/guild/contexts/GuildContext';
import IMember from '../../../types/member/Member';
import useRoles from '../../../types/role/hooks/useRoles';
import useUser from '../../../types/user/hooks/useUser';
import extractNameAndTag from '../../../utils/extractNameAndTag';

type MembersSliderItemProps = {
  member: IMember | undefined;
};

const MembersSliderItem = ({ member }: MembersSliderItemProps) => {
  const [user] = useUser(member?.userId);
  const [name] = extractNameAndTag(user?.username ?? '');
  const [openUserPartialModal] = useUserPartialModal();
  const guild = useGuildFromProvider();
  const [roles] = useRoles(guild?.rolesId);
  const isGuildOwner = useMemo(() => {
    if (!roles) return false;

    return roles.roles.some(
      (role) => role.id === member?.roleId && role.name === 'owner'
    );
  }, [roles, member]);

  return (
    <li
      onClick={() => openUserPartialModal(user?.id)}
      className="h-15 flex items-center gap-2.5"
    >
      <ProfilePicture className="h-9 w-9 shrink-0" user={user} />
      <div className="truncate font-medium">{name}</div>
      {isGuildOwner && <IconCrown className="ml-auto h-5 w-5 text-gold-100" />}
    </li>
  );
};

export default MembersSliderItem;
