import { useNavigate, useParams } from 'react-router-dom';
import ChatToolbar from './pages/chat/components/ChatToolbar';
import useGuild from '../../types/guild/hooks/useGuild';
import useCategories from '../../types/category/hooks/useCategories';
import { useMembersSlider } from '../../contexts/members-slider/MembersSliderContext';
import { toast } from 'react-toastify';
import Chat from './pages/chat/Chat';
import usePartOfGuild from './pages/guilds/hooks/usePartOfGuild';
import { useEffect, useMemo } from 'react';
import ChannelMessages from './components/ChannelMessages';
import { useCurrentUser } from '../../contexts/current-user/CurrentUserContext';
import { useSwipeListener } from '../../contexts/SwipeListenerContext';
import findChannel from '../../types/channel/utils/findChannel';
import ChannelDeletionListener from './components/ChannelDeletionListener';

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
    if (!categories || !channelId) return;

    return findChannel(channelId, categories.categories)[0];
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
    openMembersSlider({
      title: channel?.name,
      titlePrefix: '#',
      membersId: guild?.membersId,
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
      <ChannelDeletionListener
        guildId={guildId}
        channelId={channelId}
        categoriesId={categories?.id}
      />

      <ChatToolbar prefix="#" onOpenMembersSlider={handleOpenMembersSlider}>
        {channel?.name}
      </ChatToolbar>

      {partOfGuild && <ChannelMessages channel={channel} />}
    </Chat>
  );
};

export default Channel;
