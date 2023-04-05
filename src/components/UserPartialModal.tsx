import { format } from 'date-fns';
import { IconChatBubble } from '../assets/icons';
import { PartialScreenModalMethods } from '../contexts/partial-screen-modal/PartialScreenModalContext';
import ProfilePicture from '../pages/channels/components/ProfilePicture';
import extractNameAndTag from '../utils/extractNameAndTag';
import useUser from '../types/user/hooks/useUser';

type UserPartialModalProps = {
  userId: string;
  close: PartialScreenModalMethods[1];
};

const UserPartialModal = ({ userId, close }: UserPartialModalProps) => {
  const [user] = useUser(userId);
  const [name, tag] = extractNameAndTag(user?.username ?? '');

  return (
    <div className="flex min-h-screen flex-col items-center bg-background-700 bg-opacity-50">
      <div className="min-h-[65vh] w-full flex-1" onClick={close} />

      <div className="mb-3 h-1.5 w-16 rounded bg-silvergrey-300" />

      <div className="min-h-[85vh] w-full overflow-hidden rounded-t-lg bg-background-500">
        <div className="relative mb-11 h-20 bg-slate-600">
          <div className="absolute left-4 top-8 rounded-full bg-background-500 p-2">
            <ProfilePicture className="h-20 w-20 text-2xl" user={user} />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="rounded-lg bg-background-700 py-4">
            <div className="px-4 text-xl font-semibold">
              <span className="">{name}</span>{' '}
              <span className="font-medium text-silvergrey-300">#{tag}</span>
            </div>

            <div className="my-2.5 border-b border-background-500" />

            <div className="mt-4 px-4 text-silvergrey-300">
              <div className="flex flex-col items-center">
                <IconChatBubble className="h-7 w-7" />
                <div className="mt-0.5 text-silvergrey-400">Message</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-background-700 py-4">
            <div className="px-4">
              <div className="heading-2 mb-2.5">Discord member since</div>
              <div>
                {user && format(user.creationTimestamp.toDate(), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPartialModal;
