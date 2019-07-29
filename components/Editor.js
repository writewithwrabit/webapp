import { useState, useRef, useEffect } from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

import { FaBold, FaItalic, FaUnderline, FaQuoteLeft, FaListOl, FaListUl } from 'react-icons/fa';

const selectableBlockTypes = {
  paragraph: 'Paragraph',
  'heading-one': 'Heading 1',
  'heading-two': 'Heading 2',
  'heading-three': 'Heading 3',
};

const icons = {
  bold: FaBold,
  italic: FaItalic,
  underlined: FaUnderline,
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

const Editor = () => {
  let editor = null;
  const blockSelectorDropdown = useRef();

  const [value, setValue] = useState(emptyDocument); 
  
  const goalWords = 1000;
  const [wordsWritten, setWordsWritten] = useState(0);
  const [wordsRemaining, setWordsRemaining] = useState(goalWords);
  const percentWordsRemaining = ((wordsWritten / goalWords) * 100).toFixed(2);
  const progressBarStyles = {
    width: `${percentWordsRemaining}%`,
  };

  const [blockSelectorState, setBlockSelectorState] = useState(false);
  const blockSelectorStyles = {
    display: blockSelectorState ? 'block' : 'none',
  };
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
        className="mx-2 hover:text-white"
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
        className="mx-2 hover:text-white"
        active={isActive}
        onMouseDown={event => onClickBlock(event, type)}
      >
        <IconComponent />
      </button>
    );
  }

  const renderBlock = (props, editor, next) => {
    const { attributes, children, node, isSelected } = props;

    if (isSelected && Object.keys(selectableBlockTypes).includes(node.type)) {
      setBlockType(selectableBlockTypes[node.type]);
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

  const onClickBlockSelector = async (e, blockType) => {
    await onClickBlock(e, blockType);
    setBlockSelectorState(!blockSelectorState);
  }

  const renderBlockTypeOption = (blockType, displayName) => {
    return (
      <div className="blocktype-option cursor-pointer hover:bg-gray-300 py-2 px-4" onMouseDown={(e) => onClickBlockSelector(e, blockType)}>
        {displayName}
      </div>
    );
  }

  const outsideClickListener = event => {
    const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    if (!element.contains(event.target) && isVisible(element)) {
      closeBlockSelector();
    }
  }

  const openBlockSelector = e => {
    e.preventDefault();
    setBlockSelectorState(!blockSelectorState);
  }

  const handleClickOutside = e => {
    if (blockSelectorDropdown.current.contains(e.target)) {
      return;
    }

    setBlockSelectorState(false);
  };

  useEffect(() => {
    if (blockSelectorState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [blockSelectorState]);

  return (
    <div className="min-h-screen">
      <div className="shadow-xl">
        <div className="bg-gray-800 p-4 rounded-t-lg text-gray-500 flex justify-center sm:justify-between items-center">
          <div >
            <span className="mx-4 inline-block relative">
              <span className="block-selector">
                <div
                  className="cursor-pointer bg-gray-400 text-gray-800 font-bold py-1 px-4 w-40 sm:w-48 rounded-lg"
                  onMouseDown={openBlockSelector}
                >
                  {selectedBlockType}
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>

                <div
                  ref={blockSelectorDropdown}
                  className="bg-gray-100 shadow-lg text-gray-800 py-4 w-48 rounded-lg absolute top-0 z-10"
                  style={blockSelectorStyles}
                >
                  {renderBlockTypeOption('paragraph', 'Paragraph')}
                  {renderBlockTypeOption('heading-one', 'Heading 1')}
                  {renderBlockTypeOption('heading-two', 'Heading 2')}
                  {renderBlockTypeOption('heading-three', 'Heading 3')}
                </div>
              </span>
            </span>

            <span className="mx-4">
              {renderMarkButton('bold')}
              {renderMarkButton('italic')}
              {renderMarkButton('underlined')}
            </span>

            <span className="mx-4">
              {renderBlockButton('block-quote')}
              {renderBlockButton('numbered-list')}
              {renderBlockButton('bulleted-list')}
            </span>
          </div>

          <div className="hover:text-white text-sm flex-col text-right font-extrabold leading-tight hidden sm:flex">
            <span>
              {wordsWritten}
            </span>
            <span>
              words
            </span>
          </div>
        </div>
        
        {/* 
        <div className="words-written w-40 -mx-40 pr-4 text-2xl text-gray-800 opacity-10 flex flex-col text-right z-10 font-extrabold sticky top-0 leading-tight">
          <span>
            {wordsWritten}
          </span>
          <span>
            words
          </span>
        </div>
        */}

        <SlateEditor
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

      <div className="progress-bar fixed bottom-0 container my-2 px-2">
        <div className="progress bg-gray-800 h-3 max-w-full rounded-lg" style={progressBarStyles}></div>
      </div>
    </div>
  );
};

export default Editor;
