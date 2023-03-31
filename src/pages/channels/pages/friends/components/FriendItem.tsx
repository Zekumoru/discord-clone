import IconChatBubble from '../../../../../assets/icons/IconChatBubble';
import IFriend from '../../../../../types/Friend';

type FriendItemProps = {
  friend: IFriend;
};

const FriendItem = ({ friend }: FriendItemProps) => {
  return (
    <li className="li-rule-85 relative flex items-center gap-2 px-4 py-2">
      <span className="inline-block h-10 w-10 rounded-full bg-neutral-600" />
      <span className="mr-auto font-semibold">{friend.userId}</span>
      <span className="grid h-8 w-8 place-content-center rounded-full bg-background-500">
        <IconChatBubble className="h-4 w-4" />
      </span>
    </li>
  );
};

export default FriendItem;
