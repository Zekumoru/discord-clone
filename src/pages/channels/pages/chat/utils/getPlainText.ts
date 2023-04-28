import { EditorState, convertToRaw } from 'draft-js';
import MentionUserData from '../components/types/MentionUserData';

const getPlainText = (editorState: EditorState) => {
  const texts: string[] = [];
  const { blocks, entityMap } = convertToRaw(editorState.getCurrentContent());

  blocks.forEach(({ entityRanges, text }) => {
    if (entityRanges.length === 0) texts.push(text);

    entityRanges.forEach(({ offset: start, length, key }) => {
      const end = start + length;

      const mapEntry = entityMap[key] as unknown as {
        type: 'mention';
        data: {
          mention: MentionUserData;
        };
      };

      const userId = mapEntry.data.mention.id;
      texts.push(
        String.prototype.concat(
          text.slice(0, start),
          `<@${userId}>`,
          text.slice(end)
        )
      );
    });
  });

  return texts.join('\n');
};

export default getPlainText;
