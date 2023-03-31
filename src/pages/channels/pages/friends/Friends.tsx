import IconUserPlus from '../../../../assets/icons/IconUserPlus';
import snowflakeId from '../../../../utils/snowflake-id/snowflakeId';
import Toolbar from '../../components/Toolbar';
import FriendItem from './components/FriendItem';
import IFriend from './types';

const createFriend = (name: string) => {
  return {
    name,
    userId: snowflakeId(),
    chatId: snowflakeId(),
    photoUrl: null,
  } as IFriend;
};

const friends = [createFriend('Foo'), createFriend('Bar'), createFriend('Baz')];

const Friends = () => {
  return (
    <>
      <Toolbar buttons={<IconUserPlus className="h-6 w-6" />}>Friends</Toolbar>

      <div className="py-4">
        <h2 className="heading-2 px-4">Added — 3</h2>
        <ul>
          {friends.map((friend) => (
            <FriendItem key={friend.userId} friend={friend} />
          ))}
        </ul>

        <h2 className="heading-2 mt-4 px-4">Requests — 1</h2>
        <ul>
          <FriendItem friend={createFriend('Foobar')} />
        </ul>
      </div>
    </>
  );
};

export default Friends;
