import { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

import { FaBold, FaItalic, FaUnderline, FaHeading, FaQuoteLeft, FaListOl, FaListUl } from 'react-icons/fa';

import withLayout from '../components/Layout';

const selectableBlockTypes = [
  'paragraph',
  'heading-one',
  'heading-two',
  'heading-three',
];

const icons = {
  bold: FaBold,
  italic: FaItalic,
  underlined: FaUnderline,
  'heading-one': FaHeading,
  'heading-two': FaHeading,
  'heading-three': FaHeading,
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
        nodes: [
          {
            object: 'text',
            text: `Ipsum Blaster`,
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: `Ipsum Blaster luke jedi saffron bazoolium ice gun boomer. Jedi bazoolium time lord ord mantell psychic paper youngling paradox machine antilles. Obi-wan exterminate sullust tatooine rassilon. Dantooine tylium ore fodder jedi mind trick, jabba saffron jango fett validium. Jelly babies dantooine saffron jethrik frack bantha malcom endor dalek sarlacc hutt carbonite wookie tatooine. Endor jedi validium droid jar jar fodder exterminate ice gun nethersphere krypter sarlacc paradox machine. Jar jar protocol droid gorram x-wing tie fighter.`,
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: `
            Ipsum Blaster luke jedi saffron bazoolium ice gun boomer. Jedi bazoolium time lord ord mantell psychic paper youngling paradox machine antilles. Obi-wan exterminate sullust tatooine rassilon. Dantooine tylium ore fodder jedi mind trick, jabba saffron jango fett validium. Jelly babies dantooine saffron jethrik frack bantha malcom endor dalek sarlacc hutt carbonite wookie tatooine. Endor jedi validium droid jar jar fodder exterminate ice gun nethersphere krypter sarlacc paradox machine. Jar jar protocol droid gorram x-wing tie fighter.`,
          },
        ],
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
  const [selectedBlockType, setBlockType] = useState('paragraph');

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
    const { attributes, children, node, isSelected } = props;

    if (isSelected && selectableBlockTypes.includes(node.type)) {
      setBlockType(node.type);
    }

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  }

  const onSelectBlockType = (event) => {
    onClickBlock(event, event.target.value);
  }

  return (
    <div className="min-h-screen">
      <div className="py-6 px-10 z-10">
        <div className="bg-green-400 py-2 rounded-lg text-white font-extrabold text-center w-1/6">
          <div>
            {wordsWritten}
          </div>
          <div>
            words
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 container">
        <div className="p-4 text-right text-gray-500 text-2xl text-pink-600">
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

          <span className="mx-4 inline-block relative">
            <select onChange={event => onSelectBlockType(event)} value={selectedBlockType} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="paragraph">Paragraph</option> 
              <option value="heading-one">Heading 1</option>
              <option value="heading-two">Heading 2</option>
              <option value="heading-three">Heading 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </span>

          <span className="mx-4">
            {renderBlockButton('block-quote')}
            {renderBlockButton('numbered-list')}
            {renderBlockButton('bulleted-list')}
          </span>
        </div>

        <Editor
          ref={(editorRef) => editor = editorRef}
          className="editor bg-offwhite p-8 min-h-screen"
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
