import { useNavigate, useParams } from 'react-router-dom';
import ChatToolbar from './pages/chat/components/ChatToolbar';
import useGuild from '../../types/guild/hooks/useGuild';
import useCategories from '../../types/category/hooks/useCategories';
import IChannel from '../../types/channel/Channel';
import { useMembersSlider } from '../../contexts/members-slider/MembersSliderContext';
import { toast } from 'react-toastify';
import Chat from './pages/chat/Chat';
import usePartOfGuild from './pages/guilds/hooks/usePartOfGuild';
import { useEffect, useMemo } from 'react';
import ChannelMessages from './components/ChannelMessages';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import { useSwipeListener } from '../../contexts/SwipeListenerContext';
import { channel } from 'diagnostics_channel';

const Channel = () => {
  const { guildId, channelId } = useParams();
  const [user] = useCurrentUser();
  const [guild] = useGuild(guildId);
  const [categories] = useCategories(guild?.categoriesId);
  const [openMembersSlider] = useMembersSlider();
  const [partOfGuild] = usePartOfGuild(guild, user);
  const { swipedRight } = useSwipeListener();
  const navigate = useNavigate();
  const channel = useMemo(() => {
    if (!categories) return;

    for (const category of categories.categories) {
      for (const channel of category.channels) {
        if (channel.id === channelId) {
          return channel;
        }
      }
    }
  }, [categories, channelId]);

  useEffect(() => {
    if (!swipedRight) return;

    handleOpenMembersSlider();
  }, [swipedRight]);

  useEffect(() => {
    if (partOfGuild === undefined) return;
    if (partOfGuild) return;

    navigate('/channels/@me');
  }, [partOfGuild]);

  const handleOpenMembersSlider = () => {
    if (!channel || !guild) {
      toast.error('Could not open members slider!');
      return;
    }

    openMembersSlider({
      title: channel.name,
      titlePrefix: '#',
      membersId: guild.membersId,
      guild: guild,
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
