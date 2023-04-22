import { useScreenModal } from '../../../../contexts/screen-modal/ScreenModalContext';
import ICategory from '../../../../types/category/Category';
import ChannelListItem from './ChannelListItem';
import CategorySettingsModal from './category-settings-modal/CategorySettingsModal';

type CategoryListItemProps = {
  category: ICategory;
};

const CategoryListItem = ({ category }: CategoryListItemProps) => {
  const [openModal, closeModal] = useScreenModal();

  const openCategorySettingsModal = () => {
    openModal(<CategorySettingsModal category={category} close={closeModal} />);
  };

  return (
    <li>
      {category.name !== '' && (
        <div className="mx-4 flex items-center gap-2.5">
          <div className="heading-2 truncate">{category.name}</div>
          <button
            onClick={openCategorySettingsModal}
            className="ml-auto text-sm font-semibold text-silvergrey-300"
          >
            Edit
          </button>
        </div>
      )}

      <ul className="mb-8">
        {category.channels.map((channel) => (
          <ChannelListItem key={channel.id} channel={channel} />
        ))}
      </ul>
    </li>
  );
};

export default CategoryListItem;
