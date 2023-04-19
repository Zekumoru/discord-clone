import GuildPicture from '../../../../../components/GuildPicture';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import useGuild from '../../../../../types/guild/hooks/useGuild';
import useInvite from '../../../../../types/invite/hooks/useInvite';
import IMessage from '../../../../../types/message/Message';
import usePartOfGuild from '../../guilds/hooks/usePartOfGuild';

type ChatInviteProps = {
  message: IMessage;
};

const ChatInvite = ({ message }: ChatInviteProps) => {
  const [user] = useCurrentUser();
  const [invite] = useInvite(message.inviteId);
  const [guild] = useGuild(invite?.guildId);
  const [partOfGuild] = usePartOfGuild(guild, user);

  return (
    <div className="round-sm bg-background-500 px-4 py-3.5">
      <header className="heading-2 mb-2">
        You are invited to join a server
      </header>

      <div className="flex items-center gap-2.5">
        <GuildPicture
          guild={guild}
          className="h-12 w-12 flex-shrink-0 !rounded-2xl"
        />
        <div className="truncate font-semibold">{guild?.name}</div>
        {partOfGuild ? (
          <button
            disabled
            className="ml-auto rounded bg-jade-400 px-4 py-2 text-sm font-medium"
          >
            Joined
          </button>
        ) : (
          <button className="ml-auto rounded bg-warmblue-100 px-5 py-2 text-sm font-medium">
            Join
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInvite;
