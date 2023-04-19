import { IconCog6Tooth, IconUserPlus } from '../../../../assets/icons';
import GuildPicture from '../../../../components/GuildPicture';
import useGuild from '../../../../types/guild/hooks/useGuild';
import useMembers from '../../../../types/member/hooks/useMembers';
import { PartialScreenModalProps } from '../../../partial-screen-modal/PartialScreenModalContext';
import PartialModalRoundedDiv from '../../../partial-screen-modal/components/PartialModalRoundedDiv';

type GuildPartialModalProps = {
  guildId: string | undefined;
} & PartialScreenModalProps;

const GuildPartialModal = ({ guildId, close }: GuildPartialModalProps) => {
  const [guild] = useGuild(guildId);
  const [members] = useMembers(guild?.membersId);
  const membersLength = members?.members.length ?? 0;

  return (
    <div className="min-h-[85vh] w-full overflow-hidden rounded-t-lg bg-background-300">
      <header className="bg-background-700">
        <div className="px-4 pb-2 pt-5">
          <GuildPicture
            className="mb-6 h-20 w-20 !rounded-3xl text-xl"
            guild={guild}
          />

          <h1 className="mb-2 text-2xl font-bold">{guild?.name}</h1>
          <p className="flex items-center gap-1 text-sm font-medium text-silvergrey-300">
            <span className="h-2.5 w-2.5 rounded-full bg-silvergrey-400" />
            {membersLength} Member{membersLength !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="mt-2 border-b border-background-100" />

        <div className="grid grid-cols-2 px-4 py-2.5 text-silvergrey-300">
          <button className="flex flex-col items-center gap-1.5 p-2 font-medium">
            <IconUserPlus className="h-7 w-7" />
            <div className="text-sm">Invite</div>
          </button>
          <button className="flex flex-col items-center gap-1.5 p-2 font-medium">
            <IconCog6Tooth className="h-7 w-7" />
            <div className="text-sm">Settings</div>
          </button>
        </div>
      </header>

      <div className="p-4">
        <PartialModalRoundedDiv className="flex flex-col gap-3 p-4 font-medium">
          <button className="text-left">Create Channel</button>

          <div className="border-b border-background-100" />

          <button className="text-left">Create Category</button>
        </PartialModalRoundedDiv>
      </div>
    </div>
  );
};

export default GuildPartialModal;
