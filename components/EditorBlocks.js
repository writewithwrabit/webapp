import { Editor, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { FaQuoteLeft, FaListOl, FaListUl } from 'react-icons/fa';

const icons = {
  'block-quote': FaQuoteLeft,
  'numbered-list': FaListOl,
  'bulleted-list': FaListUl,
}

const selectableBlockTypes = {
  paragraph: 'Paragraph',
  'heading-one': 'Heading 1',
  'heading-two': 'Heading 2',
  'heading-three': 'Heading 3',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
}

export const BlockButton = ({ format }) => {
  const editor = useSlate();

  const className = isBlockActive(editor, format) 
    ? 'mx-2 text-white' 
    : 'mx-2 hover:text-white';
  
    const IconComponent = icons[format];

  return (
    <button
      className={className}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <IconComponent />
    </button>
  );
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

export const BlockTypeOption = ({
  format,
  displayName,
  setBlockType,
  setBlockSelectorState,
}) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  if (isActive) {
    setBlockType(selectableBlockTypes[format]);
  }

  return (
    <div
      className="blocktype-option cursor-pointer hover:bg-gray-300 py-2 px-4"
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
        setBlockSelectorState(false)
      }}
    >
      {displayName}
    </div>
  );
}