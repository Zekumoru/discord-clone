import { useNavigate, useParams } from 'react-router-dom';
import ChatToolbar from './pages/chat/components/ChatToolbar';
import useGuild from '../../types/guild/hooks/useGuild';
import useCategories from '../../types/category/hooks/useCategories';
import IChannel from '../../types/channel/Channel';
import { useMembersSlider } from '../../contexts/members-slider/MembersSliderContext';
import useMembers from '../../types/member/hooks/useMembers';
import { toast } from 'react-toastify';
import Chat from './pages/chat/Chat';
import usePartOfGuild from './pages/guilds/hooks/usePartOfGuild';
import { useEffect } from 'react';
import ChannelMessages from './components/ChannelMessages';

const Channel = () => {
  const { guildId, channelId } = useParams();
  const [guild] = useGuild(guildId);
  const [categories] = useCategories(guild?.categoriesId);
  const [members] = useMembers(guild?.membersId);
  const [openMembersSlider] = useMembersSlider();
  const [partOfGuild] = usePartOfGuild(guild?.id);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (partOfGuild === undefined) return;
    if (partOfGuild) return;

    navigate('/channels/@me');
  }, [partOfGuild]);

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
    <Chat
      type="channel"
      channelId={channelId}
      disabled={!partOfGuild || partOfGuild === undefined}
      placeholder={`Message #${channel?.name}`}
    >
      <ChatToolbar prefix="#" onOpenMembersSlider={handleOpenMembersSlider}>
        {channel?.name}
      </ChatToolbar>

      {partOfGuild && <ChannelMessages channel={channel} />}
    </Chat>
  );
};

export default Channel;
