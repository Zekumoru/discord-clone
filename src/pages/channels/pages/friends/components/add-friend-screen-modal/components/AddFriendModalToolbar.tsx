import ScreenModalToolbar from '../../../../../../../contexts/screen-modal/components/ScreenModalToolbar';
import { ScreenModalMethods } from '../../../../../../../contexts/screen-modal/ScreenModalContext';

type AddFriendModalToolbarProps = {
  close: ScreenModalMethods[1];
};

const AddFriendModalToolbar = ({ close }: AddFriendModalToolbarProps) => {
  const leftElement = (
    <button className="font-medium" onClick={close}>
      Close
    </button>
  );

  return (
    <ScreenModalToolbar leftElement={leftElement}>
      Add Friend
    </ScreenModalToolbar>
  );
};

export default AddFriendModalToolbar;
