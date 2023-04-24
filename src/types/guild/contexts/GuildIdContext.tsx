import { ReactNode, createContext, useContext } from 'react';

const GuildIdContext = createContext<string | undefined>(undefined);

const useGuildId = () => {
  return useContext(GuildIdContext);
};

type GuildIdProviderProps = {
  guildId: string | undefined;
  children: ReactNode;
};

const GuildIdProvider = ({ guildId, children }: GuildIdProviderProps) => {
  return (
    <GuildIdContext.Provider value={guildId}>
      {children}
    </GuildIdContext.Provider>
  );
};

export default GuildIdProvider;
export { useGuildId };
