import { useEffect, useState } from 'react';
import ICategory from '../../../../../types/category/Category';
import { ReactSortable } from 'react-sortablejs';
import IChannel from '../../../../../types/channel/Channel';
import ChannelItem from './ChannelItem';

type CategoryGroupProps = {
  category: ICategory;
  onReorder?: (category: ICategory) => void;
};

const CategoryGroup = ({ category, onReorder }: CategoryGroupProps) => {
  const [channels, setChannels] = useState<IChannel[]>(category.channels);

  useEffect(() => {
    onReorder?.({
      ...category,
      channels,
    });
  }, [channels]);

  return (
    <div>
      {category.name !== '' && (
        <div className="heading-2 mx-4 truncate">{category.name}</div>
      )}

      <ReactSortable
        className="mb-8 list-none"
        list={channels}
        setList={setChannels}
        group="channels"
      >
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </ReactSortable>
    </div>
  );
};

export default CategoryGroup;
