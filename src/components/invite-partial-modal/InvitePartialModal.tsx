import { useState } from 'react';
import { IconLink, IconMagnifyingGlass, IconXMark } from '../../assets/icons';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import { PartialScreenModalProps } from '../../contexts/partial-screen-modal/PartialScreenModalContext';
import IGuild from '../../types/guild/Guild';
import InviteUserItem from './InviteUserItem';
import useInvitableFriends from './hooks/useInvitableFriends';
import IUser from '../../types/user/User';
import useInviteFromGuildId from '../../types/invite/hooks/useInviteFromGuildId';

type InvitePartialModalProps = {
  guild: IGuild | undefined;
} & PartialScreenModalProps;

const InvitePartialModal = ({ guild, close }: InvitePartialModalProps) => {
  const [filter, setFilter] = useState('');
  const [currentUser] = useCurrentUser();
  const [invitableFriends] = useInvitableFriends(currentUser, guild);
  const [filteredFriends, setFilteredFriends] = useState<IUser[]>([]);
  const [invite] = useInviteFromGuildId(guild?.id);

  const handleCopyLink = () => {
    if (!invite) return;

    navigator.clipboard.writeText(
      `https://${import.meta.env.VITE_APP_URL}/invite/${invite.id}`
    );
  };

  const handleFilter = (filter: string) => {
    if (!invitableFriends) return;

    setFilter(filter);
    if (filter === '') {
      setFilteredFriends([]);
      return;
    }

    setFilteredFriends(
      invitableFriends.filter((friend) =>
        friend.username.toLowerCase().includes(filter)
      )
    );
  };

  return (
    <div className="min-h-[85vh] w-full overflow-hidden rounded-t-lg bg-background-500">
      <div className="flex items-center gap-2 bg-background-700 p-4">
        <span className="font-semibold">Invite a friend</span>
        <span onClick={close} className="ml-auto text-silvergrey-300">
          <IconXMark strokeWidth={2.2} className="h-6 w-6" />
        </span>
      </div>

      <div className="text-silvergrey-300">
        <div className="m-4">
          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-1.5 font-medium"
          >
            <div className="grid h-14 w-14 place-content-center rounded-full bg-background-100">
              <IconLink className="h-8 w-8 text-white" strokeWidth={2} />
            </div>
            <div className="text-sm">Copy link</div>
          </button>
        </div>

        <div className="my-4 border-b-2 border-background-100" />

        <div className="mx-4 mb-4 flex gap-2 rounded bg-background-700 px-4 py-3 leading-none">
          <input
            type="text"
            value={filter}
            onChange={(e) => handleFilter(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none"
            minLength={3}
            maxLength={32}
            placeholder={`Invite friends to ${guild?.name}`}
            required
          />
          <IconMagnifyingGlass
            className="h-5 w-5 text-silvergrey-400"
            strokeWidth={2}
          />
        </div>

        {!invitableFriends || invitableFriends.length === 0 ? (
          <div className="mx-4 text-center">
            You currently have no friends to invite.
          </div>
        ) : (
          <ul className="mx-4">
            {filter !== '' ? (
              filteredFriends.length === 0 ? (
                <div className="mx-4 text-center">No friends found!</div>
              ) : (
                filteredFriends.map((friend) => (
                  <InviteUserItem key={friend.id} user={friend} />
                ))
              )
            ) : (
              invitableFriends.map((friend) => (
                <InviteUserItem key={friend.id} user={friend} />
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InvitePartialModal;
