import { ReactNode, createContext, useContext, useState } from 'react';
import MembersSlider, { MembersSliderProps } from './components/MembersSlider';
import { MembersSliderPrefix } from './components/MembersSliderHeader';
import IGuild from '../../types/guild/Guild';
import GuildProvider from '../../types/guild/contexts/GuildContext';

const noop = () => {};

type MembersSliderOpenOptions = {
  title: string;
  guild?: IGuild;
  titlePrefix: MembersSliderPrefix;
  membersId: string;
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
  const [membersId, setMembersId] = useState<string>();
  const [guild, setGuild] = useState<IGuild>();

  const open = ({
    title,
    titlePrefix,
    membersId,
    guild,
  }: MembersSliderOpenOptions) => {
    setIsOpen(true);
    setTitle(title);
    setTitlePrefix(titlePrefix);
    setMembersId(membersId);
    setGuild(guild);
  };

  const close = () => {
    setIsOpen(false);
    setTitle('');
    setTitlePrefix(undefined);
    setMembersId(undefined);
    setGuild(undefined);
  };

  return (
    <MembersSliderContext.Provider value={[open, close]}>
      <IsOpenMembersSliderContext.Provider value={isOpen}>
        <GuildProvider guild={guild}>
          {isOpen && (
            <MembersSlider
              title={title}
              titlePrefix={titlePrefix}
              membersId={membersId}
            />
          )}
          {children}
        </GuildProvider>
      </IsOpenMembersSliderContext.Provider>
    </MembersSliderContext.Provider>
  );
};

export default MembersSliderProvider;
export { useMembersSlider, useIsOpenMembersSlider };
