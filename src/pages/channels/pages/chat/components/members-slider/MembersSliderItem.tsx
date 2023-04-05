import { IParticipant } from '../../../../../../types/chat/Chat';
import useUser from '../../../../../../types/user/hooks/useUser';
import removeTagFromName from '../../../../../../utils/removeTagFromName';
import ProfilePicture from '../../../../components/ProfilePicture';

type MembersSliderItemProps = {
  member: IParticipant | undefined;
};

const MembersSliderItem = ({ member }: MembersSliderItemProps) => {
  const [user] = useUser(member?.userId);

  return (
    <li className="h-15 flex items-center gap-2.5">
      <ProfilePicture className="h-9 w-9 shrink-0" user={user} />
      <div className="truncate font-medium">
        {removeTagFromName(user?.username ?? '')}
      </div>
    </li>
  );
};

export default MembersSliderItem;
