import { useState } from 'react';

const useChannelNameChange = (initialName?: string) => {
  const [channelName, setChannelName] = useState(initialName ?? '');

  const channelNameChange = (channelName: string) => {
    if (channelName === ' ') return;

    const processedName = channelName.toLowerCase().replaceAll(' ', '-');
    if (!processedName.match(/^(\w+-?)*$/)) return;

    setChannelName(processedName);
  };

  return [channelName, channelNameChange] as const;
};

export default useChannelNameChange;
