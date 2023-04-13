import { IconChevronLeft, IconChevronRight } from '../../../assets/icons';
import { useCurrentUser } from '../../../contexts/current-user/CurrentUserContext';
import { ScreenModalMethods } from '../../../contexts/screen-modal/ScreenModalContext';
import ScreenModalToolbar from '../../../contexts/screen-modal/components/ScreenModalToolbar';
import InsetList from '../../modal-utils/InsetList';
import InsetListItem from '../../modal-utils/InsetListItem';

type AccountModalProps = {
  close: ScreenModalMethods[1];
};

const AccountModal = ({ close }: AccountModalProps) => {
  const [currentUser] = useCurrentUser();

  return (
    <div className="min-h-screen bg-background-300">
      <ScreenModalToolbar
        leftElement={
          <>
            <button onClick={close} className="flex overflow-x-hidden">
              <IconChevronLeft className="relative top-[1.1px] h-5 w-5" />
              <span className="truncate font-medium">Overview</span>
            </button>
          </>
        }
      >
        Account
      </ScreenModalToolbar>

      <div className="heading-2 mb-2 mt-8 px-4">Account Information</div>
      <InsetList>
        <InsetListItem
          className="ml-auto font-medium"
          prefix={<span className="text-white">Username</span>}
          postfix={<IconChevronRight className="h-4 w-4" strokeWidth={3} />}
        >
          {currentUser?.username}
        </InsetListItem>
        <InsetListItem
          className="ml-auto font-medium normal-case"
          prefix={<span className="text-white">Email</span>}
        >
          {currentUser?.email}
        </InsetListItem>
        <InsetListItem
          className="ml-auto font-medium"
          prefix={<span className="text-white">Password</span>}
          postfix={<IconChevronRight className="h-4 w-4" strokeWidth={3} />}
        />
      </InsetList>

      <div className="heading-2 mb-2 mt-8 px-4">Account Management</div>
      <InsetList>
        <InsetListItem className="text-salmon-400">
          Delete Account
        </InsetListItem>
      </InsetList>
    </div>
  );
};

export default AccountModal;
