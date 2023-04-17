import { useParams } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import ChatToolbar from './pages/chat/components/ChatToolbar';
import useGuild from '../../types/guild/hooks/useGuild';
import useCategories from '../../types/category/hooks/useCategories';
import IChannel from '../../types/channel/Channel';

const Channel = () => {
  const { guildId, channelId } = useParams();
  const [guild] = useGuild(guildId);
  const [categories] = useCategories(guild?.categoriesId);
  let channel: IChannel | undefined;

  if (categories) {
    categories.categories.forEach((category) => {
      category.channels.forEach((c) => {
        if (c.id === channelId) {
          channel = c;
        }
      });
    });
  }

  return (
    <div>
      <ChatToolbar
        prefix={
          <span className="relative top-[1px] ml-2 mr-1 text-xl font-medium text-silvergrey-400">
            #
          </span>
        }
        onMembersSlide={() => {}}
      >
        {channel?.name}
      </ChatToolbar>
    </div>
  );
};

export default Channel;
