import extractNameAndTag from '../../../../../utils/extractNameAndTag';
import ProfilePicture from '../../../components/ProfilePicture';
import MentionUserData, {
  EVERYONE_MENTION_ID,
  HERE_MENTION_ID,
} from './types/MentionUserData';

type MentionEntryProps = {
  mention: MentionUserData;
  isFocused: boolean;
  searchValue?: string;
  selectMention: (mention: MentionUserData) => void;
};

const MentionEntry = ({
  mention,
  isFocused,
  selectMention,
  searchValue,
  ...props
}: MentionEntryProps) => {
  const user = mention.user;
  const [name, tag] = extractNameAndTag(user?.username ?? '');
  const notAUser =
    mention.id === EVERYONE_MENTION_ID || mention.id === HERE_MENTION_ID;

  return (
    <div {...props} className="flex items-center rounded px-2.5 py-1.5">
      {notAUser ? (
        <span>@{mention.name}</span>
      ) : (
        <>
          <ProfilePicture user={user} className="mr-2 h-8 w-8" />
          <span>{name}</span>
          <span className="text-silvergrey-400">#{tag}</span>
        </>
      )}
    </div>
  );
};

export default MentionEntry;
