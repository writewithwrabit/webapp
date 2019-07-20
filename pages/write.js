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

const Write = () => {
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

  const renderMarkButton = (type) => {
    const isActive = hasMark(type);
    const IconComponent = icons[type];

    if (!IconComponent) {
      return;
    }
    
    return (
      <button
        active={isActive}
        // onMouseDown={event => onClickMark(event, type)}
      >
        <IconComponent />
      </button>
    );
  }

  const hasBlock = type => value.blocks.some(block => block.type === type);

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
        // onMouseDown={event => onClickMark(event, type)}
      >
        <IconComponent />
      </button>
    );
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
          className="bg-offwhite p-8 min-h-screen"
          placeholder={`Hope you're having a great day, time to write!`}
          value={value}
          onChange={handleChange}
          autoFocus={true}
          autoCorrect={true}
        />
      </div>
    </div>
  );
};

export default withLayout(Write);
