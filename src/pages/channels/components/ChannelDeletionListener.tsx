import {
  Unsubscribe,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import categoriesCollection from '../../../types/category/firebase/categoriesCollection';
import findChannel from '../../../types/channel/utils/findChannel';
import { queryClient } from '../../../components/QueryClientInitializer';
import ICategory from '../../../types/category/Category';

const findAvailableChannel = (categories: ICategory[]) => {
  for (const category of categories) {
    const channel = category.channels[0];

    if (channel) {
      return channel;
    }
  }
};

type ChannelDeletionListenerProps = {
  guildId: string | undefined;
  channelId: string | undefined;
  categoriesId: string | undefined;
};

const ChannelDeletionListener = ({
  guildId,
  channelId,
  categoriesId,
}: ChannelDeletionListenerProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!guildId) return;
    if (!channelId) return;
    if (!categoriesId) return;

    let unsubscribe: Unsubscribe = () => {};

    try {
      const categoriesQuery = query(
        categoriesCollection,
        where('id', '==', categoriesId),
        limit(1)
      );
      unsubscribe = onSnapshot(categoriesQuery, (snapshot) => {
        const { type, doc } = snapshot.docChanges()[0];
        if (type !== 'modified') return;

        const categories = doc.data();
        const [channel] = findChannel(channelId, categories.categories);
        if (channel) return;

        const availableChannel = findAvailableChannel(categories.categories);
        if (!availableChannel) {
          toast.warn(`Channel deletion error occurred!`);
          navigate(`/channels/@me`);
          return;
        }

        toast.warn(`Channel has been deleted!`);
        queryClient.invalidateQueries(['categories', categoriesId]);
        navigate(`/channels/${guildId}/${availableChannel.id}`);
      });
    } catch (error) {
      toast.error('An error occurred in channel listener!');
      console.error(error);
      unsubscribe();
    }

    return unsubscribe;
  }, [guildId, channelId, categoriesId]);

  return null;
};

export default ChannelDeletionListener;
