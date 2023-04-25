import { toast } from 'react-toastify';
import GuildPicture from '../../../../../components/GuildPicture';
import { useCurrentUser } from '../../../../../contexts/current-user/CurrentUserContext';
import useGuild from '../../../../../types/guild/hooks/useGuild';
import useJoinGuild from '../../../../../types/guild/hooks/useJoinGuild';
import useInvite from '../../../../../types/invite/hooks/useInvite';
import IMessage from '../../../../../types/message/Message';
import usePartOfGuild from '../../guilds/hooks/usePartOfGuild';
import LoadingScreen from '../../../../../components/LoadingScreen';
import DiscordError from '../../../../../utils/DiscordError';
import { useNavigate } from 'react-router-dom';

type ChatInviteProps = {
  message: IMessage;
};

const ChatInvite = ({ message }: ChatInviteProps) => {
  const [user] = useCurrentUser();
  const [invite, inviteLoading] = useInvite(message.inviteId);
  const inviteExists = !inviteLoading && invite;
  const [guild, guildLoading] = useGuild(invite?.guildId);
  const [partOfGuild, partOfGuildLoading] = usePartOfGuild(guild, user);
  const loading = guildLoading || partOfGuildLoading || inviteLoading;
  const navigate = useNavigate();
  const { mutate: joinGuild, isLoading } = useJoinGuild({
    onSuccess: ({ guild }) => navigate(`/channels/${guild.id}`),
    onError: (error) => {
      if (error instanceof DiscordError) {
        toast.error('Could not join server!');
      } else {
        toast.error('An unknown error has occurred!');
      }
    },
  });

  const handleJoinGuild = () => {
    if (!guild || !user) {
      toast.error('Could not join server!');
      return;
    }

    joinGuild({
      user,
      guild,
    });
  };

  return (
    <div className="round-sm bg-background-500 px-4 py-3.5">
      {isLoading && <LoadingScreen />}

      <header className="heading-2">
        {inviteExists ? 'You are invited to join a server' : 'Invite expired'}
      </header>

      <div className="mt-2 flex items-center gap-2.5">
        {loading ? (
          <>
            <GuildPicture
              guild={undefined}
              className="h-12 w-12 flex-shrink-0 !rounded-2xl"
            />

            <div className="skeleton-loading h-5 w-2/5 rounded-full" />
            <button
              disabled
              className="ml-auto rounded bg-warmblue-100 px-4 py-2 text-sm font-medium opacity-40"
            >
              Join
            </button>
          </>
        ) : (
          inviteExists && (
            <>
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
                <button
                  onClick={handleJoinGuild}
                  className="ml-auto rounded bg-warmblue-100 px-5 py-2 text-sm font-medium"
                >
                  Join
                </button>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ChatInvite;
