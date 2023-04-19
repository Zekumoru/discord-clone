import { useNavigate, useParams } from 'react-router-dom';
import extractNameAndTag from '../../utils/extractNameAndTag';
import Logo from '../authentication/components/Logo';
import ProfilePicture from '../channels/components/ProfilePicture';
import useInvite from '../../types/invite/hooks/useInvite';
import useGuild from '../../types/guild/hooks/useGuild';
import GuildPicture from '../../components/GuildPicture';
import useMembers from '../../types/member/hooks/useMembers';
import useJoinGuild from '../../types/guild/hooks/useJoinGuild';
import DiscordError from '../../utils/DiscordError';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/LoadingScreen';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';

const Invite = () => {
  const { id: inviteId } = useParams();
  const [invite, inviteLoading] = useInvite(inviteId);
  const [guild, guildLoading] = useGuild(invite?.guildId);
  const [members, membersLoading] = useMembers(guild?.membersId);
  const [user, userLoading] = useCurrentUser();
  const [name] = extractNameAndTag(user?.username ?? '');
  const navigate = useNavigate();
  const membersLength = members?.members.length ?? 0;
  const loading =
    inviteLoading || guildLoading || membersLoading || userLoading;
  const { mutate: joinGuild, isLoading: joiningLoading } = useJoinGuild({
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
    <form
      onSubmit={(e) => {
        handleJoinGuild();
        e.preventDefault();
      }}
      className="flex flex-col items-center px-4 py-5 text-silvergrey-300"
    >
      {joiningLoading && <LoadingScreen />}

      <Logo className="mb-10 h-9 text-white" />

      {loading ? (
        <div className="fixed left-0 right-0 top-0 grid min-h-screen place-content-center">
          <div className="loading-circle" />
        </div>
      ) : guild === undefined ? (
        <div className="fixed left-0 right-0 top-0 flex min-h-screen flex-col items-center justify-center p-4">
          <img
            className="mb-4 h-40 w-40"
            src="https://sticker-collection.com/stickers/animated/HelloWumpus/whatsapp/f0b09d7a-8b6e-44dc-89d0-f8a8b116cd35file_3674676.webp"
            alt="Wumpus Huh?"
          />
          <div className="mb-6 text-center font-medium">
            Er... Wrong invitation?
          </div>

          <button
            onClick={() => navigate('/channels/@me')}
            className="btn w-full text-white"
          >
            Back to home
          </button>
        </div>
      ) : (
        <>
          <ProfilePicture user={user} className="my-6 h-20 w-20" />
          <p className="mx-4 text-center">{name} invited you to join</p>
          <div className="my-2.5 flex w-full items-center justify-center gap-2 px-4">
            <GuildPicture
              guild={guild}
              className="flex-shrink-0 !rounded-2xl"
            />
            <div className="truncate text-2xl font-bold text-white">
              {guild?.name}
            </div>
          </div>
          <p className="mb-6 flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-silvergrey-300" />
            {membersLength} Member{membersLength !== 1 ? 's' : ''}
          </p>
          <button className="btn text-white">Accept Invite</button>
        </>
      )}
    </form>
  );
};

export default Invite;
