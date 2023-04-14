import { IconChevronRight } from '../../../../assets/icons';
import { useCurrentUser } from '../../../../contexts/current-user/CurrentUserContext';
import { ScreenModalMethods } from '../../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../../contexts/screen-modal/components/ScreenModalToolbar';
import InsetList from '../../../modal-utils/InsetList';
import InsetListItem from '../../../modal-utils/InsetListItem';
import ModalChevronCloseButton from '../../../modal-utils/ModalChevronCloseButton';
import DeleteAccountListItem from './components/DeleteAccountListItem';
import EditPasswordListItem from './components/EditPasswordListItem';
import EditUsernameListItem from './components/EditUsernameListItem';

type AccountModalProps = {
  close: ScreenModalMethods[1];
};

const AccountModal = ({ close }: AccountModalProps) => {
  const [currentUser] = useCurrentUser();

  return (
    <div className="min-h-screen bg-background-300">
      <ScreenModalToolbar
        leftElement={
          <ModalChevronCloseButton close={close}>
            Overview
          </ModalChevronCloseButton>
        }
      >
        Account
      </ScreenModalToolbar>

      <div className="heading-2 mb-2 mt-8 px-4">Account Information</div>
      <InsetList>
        <EditUsernameListItem />

        <InsetListItem
          className="ml-auto font-medium normal-case"
          prefix={<span className="text-white">Email</span>}
        >
          {currentUser?.email}
        </InsetListItem>

        <EditPasswordListItem />
      </InsetList>

      <div className="heading-2 mb-2 mt-8 px-4">Account Management</div>
      <InsetList>
        <DeleteAccountListItem />
      </InsetList>
    </div>
  );
};

export default AccountModal;