import { IParticipant } from '../../../../../../types/chat/Chat';
import MembersSliderHeader, {
  MembersSliderHeaderProps,
} from './MembersSliderHeader';
import MembersSliderItem from './MembersSliderItem';

type MembersSliderProps = {
  isOpen: boolean;
  headerProps: Omit<MembersSliderHeaderProps, 'children'> & {
    title: string;
  };
  members: IParticipant[];
  onClose?: () => void;
};

const MembersSlider = ({
  isOpen,
  onClose,
  headerProps,
  members,
}: MembersSliderProps) => {
  return (
    <div
      className={`fixed bottom-0 top-0 z-50 flex ${
        isOpen ? 'left-0 right-0' : '-right-full'
      }`}
    >
      <div onClick={onClose} className="grow" />
      <div className="w-80 bg-background-300 shadow-material">
        <MembersSliderHeader prefix={headerProps.prefix}>
          {headerProps.title}
        </MembersSliderHeader>

        <div className="h-screen-slide-header overflow-y-auto p-4">
          <div className="heading-2 mb-3">Members — 2</div>
          <ul className="flex flex-col gap-2.5">
            {members.map((member) => (
              <MembersSliderItem key={member.userId} member={member} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MembersSlider;
