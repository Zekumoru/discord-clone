import { useMembersId } from '../../../types/member/contexts/MembersIdContext';
import useMembers from '../../../types/member/hooks/useMembers';
import SwipeListenerProvider from '../../SwipeListenerContext';
import {
  useIsOpenMembersSlider,
  useMembersSlider,
} from '../MembersSliderContext';
import MembersSliderHeader, {
  MembersSliderPrefix,
} from './MembersSliderHeader';
import MembersSliderItem from './MembersSliderItem';
import MembersSliderLoadingItem from './MembersSliderLoadingItem';

type MembersSliderProps = {
  title: string;
  titlePrefix: MembersSliderPrefix;
};

const MembersSlider = ({ title, titlePrefix }: MembersSliderProps) => {
  const [_open, close] = useMembersSlider();
  const [members] = useMembers(useMembersId());
  const isOpen = useIsOpenMembersSlider();

  return (
    <SwipeListenerProvider
      onSwipeLeft={close}
      className={`fixed bottom-0 top-0 z-50 flex ${
        isOpen ? 'left-0 right-0' : '-right-full'
      }`}
    >
      <div onClick={close} className="grow" />
      <div className="w-80 bg-background-300 shadow-material">
        <MembersSliderHeader prefix={titlePrefix}>{title}</MembersSliderHeader>

        <div className="h-screen-slide-header overflow-y-auto p-4">
          <div className="heading-2 mb-3">
            Members — {members?.members.length ?? 0}
          </div>
          <ul className="flex flex-col gap-2.5">
            {members?.members.map((member) => (
              <MembersSliderItem key={member.userId} member={member} />
            )) ??
              Array(20)
                .fill(undefined)
                .map((_, index) => <MembersSliderLoadingItem key={index} />)}
          </ul>
        </div>
      </div>
    </SwipeListenerProvider>
  );
};

export default MembersSlider;
export type { MembersSliderProps };
