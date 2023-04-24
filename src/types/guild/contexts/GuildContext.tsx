import { ReactNode, createContext, useContext } from 'react';
import IGuild from '../Guild';

const GuildContext = createContext<IGuild | undefined>(undefined);

const useGuildFromProvider = () => {
  return useContext(GuildContext);
};

type GuildProviderProps = {
  guild: IGuild | undefined;
  children: ReactNode;
};

const GuildProvider = ({ guild, children }: GuildProviderProps) => {
  return (
    <GuildContext.Provider value={guild}>{children}</GuildContext.Provider>
  );
};

export default GuildProvider;
export { useGuildFromProvider };
