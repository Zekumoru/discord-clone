import { EditorState, getDefaultKeyBinding } from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import { useEffect, useRef, useState } from 'react';
import IUser from '../../../../../types/user/User';
import { IconPaperAirplane } from '../../../../../assets/icons';
import 'draft-js/dist/Draft.css';
import useMentionPlugin from '../hooks/useMentionPlugin';
import MentionEntry from './MentionEntry';
import getPlainText from '../utils/getPlainText';

type ChatInputProps = {
  users: IUser[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (data: { content: string; height: number }) => void;
  onEnter?: (content: string) => void;
};

const ChatInput = ({
  users,
  placeholder,
  disabled,
  onChange,
  onEnter,
}: ChatInputProps) => {
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const {
    MentionSuggestions,
    onOpenChange,
    onSearchChange,
    open,
    plugins,
    suggestions,
  } = useMentionPlugin(users);

  useEffect(() => {
    onChange?.({
      content: getPlainText(editorState),
      height: editorContainerRef.current?.scrollHeight ?? 0,
    });
  }, [editorState]);

  const focusEditor = async () => {
    await Promise.resolve();
    editorRef.current?.focus();
  };

  const handleEnter = async () => {
    const plainText = getPlainText(editorState);
    if (plainText.trim() === '') {
      focusEditor();
      return;
    }

    onEnter?.(plainText);
    setEditorState(createEditorStateWithText(''));
    focusEditor();
  };

  return (
    <>
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        onSearchChange={onSearchChange}
        suggestions={suggestions}
        entryComponent={MentionEntry}
        popoverContainer={({ children, theme }) => (
          <div className={theme.mentionSuggestions}>{children}</div>
        )}
      />

      <div className="relative bg-background-300 px-4 pb-4">
        <div
          ref={editorContainerRef}
          className="text-area max-h-60 overflow-auto rounded bg-background-100 py-2 pl-2.5 pr-[36px] shadow-sm"
        >
          <Editor
            ref={editorRef}
            editorKey="editor"
            editorState={editorState}
            plugins={plugins}
            placeholder={placeholder}
            onChange={(state) => {
              if (disabled) return;
              setEditorState(state);
            }}
            keyBindingFn={(e) => {
              if (!e.shiftKey && e.key === 'Enter') {
                // hack to fix editor bug text cursor stuck
                // in the beginning of text for 3-4 characters
                (async () => {
                  await Promise.resolve();
                  sendButtonRef.current?.focus();
                  sendButtonRef.current?.click();
                })();
              }

              if (open && e.key === 'Tab') {
                return;
              }

              return getDefaultKeyBinding(e);
            }}
          />
        </div>

        <div className="absolute right-[25px] top-2">
          <button ref={sendButtonRef} className="h-6" onClick={handleEnter}>
            <IconPaperAirplane className="h-6 w-6 text-warmblue-100" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
