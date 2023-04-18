import { IconLink, IconMagnifyingGlass, IconXMark } from '../../assets/icons';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import { PartialScreenModalProps } from '../../contexts/partial-screen-modal/PartialScreenModalContext';
import ProfilePicture from '../../pages/channels/components/ProfilePicture';
import IGuild from '../../types/guild/Guild';

type InvitePartialModalProps = {
  guild: IGuild | undefined;
} & PartialScreenModalProps;

const InvitePartialModal = ({ guild, close }: InvitePartialModalProps) => {
  const [currentUser] = useCurrentUser();

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
          <button className="flex flex-col items-center gap-1.5 font-medium">
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

        <ul className="mx-4">
          <li className="flex items-center gap-4 font-medium">
            <ProfilePicture user={currentUser} className="h-9 w-9 shrink-0" />

            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="truncate">
                <span className="text-white">Zekumoru Dragonhart</span>
                <span>#0914</span>
              </div>

              <button className="ml-auto rounded-sm bg-background-100 px-4 py-1.5 text-sm font-semibold text-white">
                Invite
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InvitePartialModal;
