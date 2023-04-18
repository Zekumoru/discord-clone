import ProfilePicture from '../../pages/channels/components/ProfilePicture';
import useUser from '../../types/user/hooks/useUser';
import extractNameAndTag from '../../utils/extractNameAndTag';

type InviteUserItemProps = {
  userId: string | undefined;
};

const InviteUserItem = ({ userId }: InviteUserItemProps) => {
  const [user] = useUser(userId);
  const [name, tag] = extractNameAndTag(user?.username ?? '');

  return (
    <li className="mb-2.5 flex items-center gap-4 font-medium last-of-type:mb-0">
      <ProfilePicture user={user} className="h-9 w-9 shrink-0" />

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="truncate">
          <span className="text-white">{name}</span>
          <span>#{tag}</span>
        </div>

        <button className="ml-auto rounded-sm bg-background-100 px-4 py-1.5 text-sm font-semibold text-white">
          Invite
        </button>
      </div>
    </li>
  );
};

export default InviteUserItem;
