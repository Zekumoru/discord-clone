import { useNavigate, useParams } from 'react-router-dom';
import useGuild from '../../../../types/guild/hooks/useGuild';
import Toolbar from '../../components/Toolbar';
import WumpusLoadingDisplay from '../friends/components/WumpusLoadingDisplay';
import useCategories from '../../../../types/category/hooks/useCategories';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Guild = () => {
  const { guildId } = useParams();
  const [guild, guildLoading] = useGuild(guildId);
  const [categories] = useCategories(guild?.categoriesId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!guildLoading) return;
    if (guild) return;

    navigate('/channels/@me');
  }, [guildLoading]);

  useEffect(() => {
    if (!categories) return;

    const category = categories.categories.find(
      (category) => category.channels.length !== 0
    )!;

    navigate(`/channels/${guild!.id}/${category.channels[0].id}`);
  }, [categories]);

  return (
    <div>
      <Toolbar />
      <WumpusLoadingDisplay />
    </div>
  );
};

export default Guild;
