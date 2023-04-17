import { ReactNode, createContext, useContext, useState } from 'react';
import MembersSlider, { MembersSliderProps } from './components/MembersSlider';
import { MembersSliderPrefix } from './components/MembersSliderHeader';
import IMember from '../../types/member/Member';

const noop = () => {};

type MembersSliderOpenOptions = {
  title: string;
  titlePrefix: MembersSliderPrefix;
  members: IMember[];
};

type MembersSliderMethods = [
  open: (options: MembersSliderOpenOptions) => void,
  close: () => void
];

const MembersSliderContext = createContext<MembersSliderMethods>([noop, noop]);

const useMembersSlider = () => {
  return useContext(MembersSliderContext);
};

const IsOpenMembersSliderContext = createContext(false);

const useIsOpenMembersSlider = () => {
  return useContext(IsOpenMembersSliderContext);
};

type MembersSliderProviderProps = {
  children: ReactNode;
};

const MembersSliderProvider = ({ children }: MembersSliderProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [titlePrefix, setTitlePrefix] = useState<MembersSliderPrefix>();
  const [members, setMembers] = useState<IMember[]>([]);

  const open = ({ title, titlePrefix, members }: MembersSliderOpenOptions) => {
    setIsOpen(true);
    setTitle(title);
    setTitlePrefix(titlePrefix);
    setMembers(members);
  };

  const close = () => {
    setIsOpen(false);
    setTitle('');
    setTitlePrefix(undefined);
    setMembers([]);
  };

  return (
    <MembersSliderContext.Provider value={[open, close]}>
      <IsOpenMembersSliderContext.Provider value={isOpen}>
        {isOpen && (
          <MembersSlider
            title={title}
            titlePrefix={titlePrefix}
            members={members}
          />
        )}
        {children}
      </IsOpenMembersSliderContext.Provider>
    </MembersSliderContext.Provider>
  );
};

export default MembersSliderProvider;
export { useMembersSlider, useIsOpenMembersSlider };
