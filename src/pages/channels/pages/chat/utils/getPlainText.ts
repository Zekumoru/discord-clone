import { EditorState, convertToRaw } from 'draft-js';
import MentionUserData from '../components/types/MentionUserData';

type MapEntry = {
  type: 'mention';
  data: {
    mention: MentionUserData;
  };
};

const getPlainText = (editorState: EditorState) => {
  const texts: string[] = [];
  const { blocks, entityMap } = convertToRaw(editorState.getCurrentContent());

  let endCursor: number = 0;
  let textBlocks: string[] = [];
  blocks.forEach(({ entityRanges, text }) => {
    textBlocks = [];

    entityRanges.forEach(({ offset: start, key }) => {
      const mapEntry = entityMap[key] as unknown as MapEntry;
      const end = start + mapEntry.data.mention.name.length;

      const userId = mapEntry.data.mention.id;
      textBlocks.push(text.slice(endCursor, start));
      textBlocks.push(`<@${userId}>`);
      endCursor = end;
    });

    textBlocks.push(text.slice(endCursor));
    texts.push(textBlocks.join(''));
  });

  return texts.join('\n');
};

export default getPlainText;
