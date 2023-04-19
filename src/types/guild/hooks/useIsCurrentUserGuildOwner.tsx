import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';
import useGuildOwnerId from './useGuildOwnerId';

const useIsCurrentUserGuildOwner = (guildId: string | undefined) => {
  const [currentUser, currentUserLoading] = useCurrentUser();
  const [guildOwnerId, guildOwnerIdLoading] = useGuildOwnerId(guildId);

  return !!currentUser && !!guildOwnerId && currentUser?.id === guildOwnerId;
};

export default useIsCurrentUserGuildOwner;
