import { useCallback, useMemo, useState } from 'react';
import IUser from '../../../../../types/user/User';
import MentionUserData from '../components/types/MentionUserData';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import mentionsStyles from '../styles/mentions.module.css';

const useMentionPlugin = (users: IUser[]) => {
  const [open, setOpen] = useState(false);
  const mentions = useMemo(() => {
    return users.map<MentionUserData>((user) => ({
      id: user.id,
      name: user.username,
      avatar: user.pictureUrl ?? undefined,
      user,
    }));
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
