import { useParams } from 'react-router-dom';
import ChatToolbar from './pages/chat/components/ChatToolbar';
import useGuild from '../../types/guild/hooks/useGuild';
import useCategories from '../../types/category/hooks/useCategories';
import IChannel from '../../types/channel/Channel';
import { useMembersSlider } from '../../contexts/members-slider/MembersSliderContext';
import useMembers from '../../types/member/hooks/useMembers';
import { toast } from 'react-toastify';

const Channel = () => {
  const { guildId, channelId } = useParams();
  const [guild] = useGuild(guildId);
  const [categories] = useCategories(guild?.categoriesId);
  const [members] = useMembers(guild?.membersId);
  const [openMembersSlider] = useMembersSlider();
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

  const handleOpenMembersSlider = () => {
    if (!channel || !members) {
      toast.error('Could not open members slider!');
      return;
    }

    openMembersSlider({
      title: channel.name,
      titlePrefix: '#',
      members: members.members,
    });
  };

  return (
    <div>
      <ChatToolbar prefix="#" onOpenMembersSlider={handleOpenMembersSlider}>
        {channel?.name}
      </ChatToolbar>
    </div>
  );
};

export default Channel;
