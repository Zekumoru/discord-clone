import { useCallback, useMemo, useState } from 'react';
import IUser from '../../../../../types/user/User';
import MentionUserData, {
  EVERYONE_MENTION_ID,
  HERE_MENTION_ID,
} from '../components/types/MentionUserData';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import mentionsStyles from '../styles/mentions.module.css';

const useMentionPlugin = (users: IUser[]) => {
  const [open, setOpen] = useState(false);
  const mentions = useMemo(() => {
    const mentions = users.map<MentionUserData>((user) => ({
      id: user.id,
      name: user.username,
      avatar: user.pictureUrl ?? undefined,
      user,
    }));

    mentions.push({
      id: EVERYONE_MENTION_ID,
      name: 'everyone',
    });

    mentions.push({
      id: HERE_MENTION_ID,
      name: 'here',
    });

    return mentions;
  }, [users]);
  const [suggestions, setSuggestions] = useState<MentionUserData[]>(mentions);
  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent: ({ className, children }) => (
        <span className={className}>@{children}</span>
      ),
      entityMutability: 'IMMUTABLE',
      supportWhitespace: true,
      theme: mentionsStyles,
    });
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  return {
    open,
    suggestions,
    onOpenChange,
    onSearchChange,
    MentionSuggestions,
    plugins,
  };
};

export default useMentionPlugin;
