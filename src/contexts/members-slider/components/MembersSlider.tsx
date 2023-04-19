import useMembers from '../../../types/member/hooks/useMembers';
import {
  useIsOpenMembersSlider,
  useMembersSlider,
} from '../MembersSliderContext';
import MembersSliderHeader, {
  MembersSliderPrefix,
} from './MembersSliderHeader';
import MembersSliderItem from './MembersSliderItem';

type MembersSliderProps = {
  title: string;
  titlePrefix: MembersSliderPrefix;
  membersId: string | undefined;
};

const MembersSlider = ({
  title,
  titlePrefix,
  membersId,
}: MembersSliderProps) => {
  const [_open, close] = useMembersSlider();
  const [members] = useMembers(membersId);
  const isOpen = useIsOpenMembersSlider();

  return (
    <div
      className={`fixed bottom-0 top-0 z-50 flex ${
        isOpen ? 'left-0 right-0' : '-right-full'
      } xl:right-0`}
    >
      <div onClick={close} className="grow" />
      <div className="w-80 bg-background-300 shadow-material xl:shadow-md">
        <MembersSliderHeader prefix={titlePrefix}>{title}</MembersSliderHeader>

        <div className="h-screen-slide-header overflow-y-auto p-4">
          <div className="heading-2 mb-3">
            Members — {members?.members.length ?? 0}
          </div>
          <ul className="flex flex-col gap-2.5">
            {members?.members.map((member) => (
              <MembersSliderItem key={member.userId} member={member} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MembersSlider;
export type { MembersSliderProps };
