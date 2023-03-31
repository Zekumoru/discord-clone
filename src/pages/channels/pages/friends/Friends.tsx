import {
  IconChatBubble,
  IconCheck,
  IconUserPlus,
  IconXMark,
} from '../../../../assets/icons';
import { useScreenModal } from '../../../../contexts/screen-modal/ScreenModal';
import IFriend from '../../../../types/Friend';
import snowflakeId from '../../../../utils/snowflake-id/snowflakeId';
import AddFriendScreenModal from '../../components/AddFriendScreenModal';
import Toolbar from '../../components/Toolbar';
import CircledIconButton from './components/CircledIconButton';
import FriendItem from './components/FriendItem';

const createFriend = () => {
  return {
    userId: snowflakeId(),
    chatId: snowflakeId(),
  } as IFriend;
};

const friends = [createFriend(), createFriend(), createFriend()];

const Friends = () => {
  const [openModal, closeModal] = useScreenModal();

  return (
    <>
      <Toolbar
        buttons={
          <div
            onClick={() =>
              openModal(<AddFriendScreenModal close={closeModal} />)
            }
          >
            <IconUserPlus className="h-6 w-6" />
          </div>
        }
      >
        Friends
      </Toolbar>

      <div className="py-4">
        <h2 className="heading-2 px-4">Added — 3</h2>
        <ul>
          {friends.map((friend) => (
            <FriendItem
              key={friend.userId}
              friend={friend}
              buttons={
                <CircledIconButton
                  icon={<IconChatBubble className="h-4 w-4" />}
                />
              }
            />
          ))}
        </ul>

        <h2 className="heading-2 mt-4 px-4">Requests — 1</h2>
        <ul>
          <FriendItem
            friend={createFriend()}
            buttons={
              <span className="flex gap-1.5">
                <CircledIconButton
                  icon={
                    <IconCheck
                      strokeWidth={2}
                      className="h-4 w-4 text-jade-100"
                    />
                  }
                />
                <CircledIconButton
                  icon={
                    <IconXMark
                      strokeWidth={2}
                      className="h-4 w-4 text-crimson-100"
                    />
                  }
                />
              </span>
            }
          />
        </ul>
      </div>
    </>
  );
};

export default Friends;
