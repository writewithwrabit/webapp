import { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

import { FaBold, FaItalic, FaUnderline, FaHeading, FaQuoteLeft, FaListOl, FaListUl } from 'react-icons/fa';

import withLayout from '../components/Layout';

const icons = {
  bold: FaBold,
  italic: FaItalic,
  underlined: FaUnderline,
  'heading-one': FaHeading,
  'heading-two': FaHeading,
  'block-quote': FaQuoteLeft,
  'numbered-list': FaListOl,
  'bulleted-list': FaListUl,
}

const emptyDocument = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
      },
    ],
  },
});

const DEFAULT_NODE = 'paragraph';

const Write = () => {
  let editor = null;
  const goalWords = 1000;
  const [value, setValue] = useState(emptyDocument);
  const [wordsWritten, setWordsWritten] = useState(0);
  const [wordsRemaining, setWordsRemaining] = useState(goalWords);

  const handleChange = ({ value }) => {
    const serializedWords = Plain.serialize(value);
    const splitWords = serializedWords.split(' ').length - 1;

    // Don't force the user to hit space before you count the first word
    const wordCount = serializedWords && splitWords === 0 ? 1 : splitWords;

    setValue(value);
    setWordsWritten(wordCount);
    setWordsRemaining(goalWords - wordCount);
  }

  const hasMark = type => value.activeMarks.some(mark => mark.type === type);

  const onClickMark = (event, type) => {
    event.preventDefault();
    editor.toggleMark(type);
  }

  const renderMarkButton = (type) => {
    const isActive = hasMark(type);
    const IconComponent = icons[type];

    if (!IconComponent) {
      return;
    }
    
    return (
      <button
        active={isActive}
        onMouseDown={event => onClickMark(event, type)}
      >
        <IconComponent />
      </button>
    );
  }

  const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  }

  const hasBlock = type => value.blocks.some(block => block.type === type);

  const onClickBlock = (event, type) => {
    event.preventDefault();

    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type);
      const isList = hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock('list-item');
      const isType = value.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === type));

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  }

  const renderBlockButton = (type) => {
    let isActive = hasBlock(type);
    const IconComponent = icons[type];

    if (!IconComponent) {
      return;
    }

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { document, blocks } = value;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <button
        className="mx-2"
        active={isActive}
        onMouseDown={event => onClickBlock(event, type)}
      >
        <IconComponent />
      </button>
    );
  }

  const renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  }

  return (
    <div className="min-h-screen">
      <div className="py-6 px-10 z-10">
        <div className="bg-green-400 py-2 rounded-lg text-white font-extrabold text-l text-center w-1/6">
          <div>
            {wordsWritten}
          </div>
          <div>
            words
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 container">
        <div className="p-4 text-right text-gray-500 text-lg">
            {wordsRemaining} words to go!
          </div>
      </div>
      
      <div className="shadow-xl">
        <div className="bg-gray-800 p-4 rounded-t-lg text-gray-500">
          <span className="mx-4">
            {renderMarkButton('bold')}
            {renderMarkButton('italic')}
            {renderMarkButton('underlined')}
          </span>

          <span className="mx-4">
            {renderBlockButton('heading-one')}
            {renderBlockButton('heading-two')}
          </span>

          <span className="mx-4">
            {renderBlockButton('block-quote')}
            {renderBlockButton('numbered-list')}
            {renderBlockButton('bulleted-list')}
          </span>
        </div>

        <Editor
          ref={(editorRef) => editor = editorRef}
          className="bg-offwhite p-8 min-h-screen"
          placeholder={`Hope you're having a great day, time to write!`}
          value={value}
          onChange={handleChange}
          autoFocus={true}
          autoCorrect={true}
          renderMark={renderMark}
          renderBlock={renderBlock}
        />
      </div>
    </div>
  );
};

export default withLayout(Write);
