import { usePreloadedQuery, useLazyLoadQuery } from 'react-relay/hooks';
import { useState, useRef, useEffect } from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { startOfDay } from 'date-fns';
import styled from '@emotion/styled';
import ConfettiCanon from 'react-dom-confetti';

import { FaBold, FaItalic, FaUnderline, FaQuoteLeft, FaListOl, FaListUl } from 'react-icons/fa';
import WordCounter from './WordCounter';

import GetEntry from '../queries/GetEntry';
import GetWordGoal from '../queries/GetWordGoal';

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

const emptyDocument = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [],
      },
    ],
  },
};

const DEFAULT_NODE = 'paragraph';

const confettiConfig = {
  angle: '225',
  spread: '47',
  startVelocity: '75',
  elementCount: '100',
  dragFriction: '0.10',
  duration: '6000',
  stagger: '2',
  width: '10px',
  height: '10px',
  colors: [
    '#fa557d',
    '#ff1c53',
    '#0a0a3c',
    '#28e6cd',
  ],
};

const StyledConfettiCanon = styled(ConfettiCanon)`
  position: absolute !important;
  right: 20px;
`;

const Editor = () => {
  const { '/write': preloadedQuery } = useStoreState(state => state.pages.preloadedQueries);
  const { dailyEntry } = usePreloadedQuery(GetEntry, preloadedQuery);

  const date = startOfDay(new Date());

  let jsonEntry;
  try {
    jsonEntry = JSON.parse(dailyEntry.content)
  } catch(e) {
    // TODO: Handle this error?
  }

  const saveEntry = useStoreActions(actions => actions.editor.saveEntry);
  const initialValue = Value.fromJSON(jsonEntry || emptyDocument);

  let editor = null;
  const blockSelectorDropdown = useRef();

  const [value, setValue] = useState(initialValue); 
  
  const { firebaseData } = useStoreState(state => state.user);
  const { wordGoal } = useLazyLoadQuery(GetWordGoal, { userID: firebaseData.uid, date });
  const [wordsWritten, setWordsWritten] = useState(0);
  const [goalHit, setGoalHit] = useState(dailyEntry.goalHit);
  const percentWordsRemaining = ((wordsWritten / wordGoal) * 100).toFixed(2);
  const progressBarStyles = {
    width: `${goalHit ? '100' : percentWordsRemaining}%`,
  };

  const [blockSelectorState, setBlockSelectorState] = useState(false);
  const blockSelectorStyles = {
    display: blockSelectorState ? 'block' : 'none',
  };
  const [selectedBlockType, setBlockType] = useState('paragraph');

  const handleChange = ({ value: newValue }) => {
    const serializedWords = Plain.serialize(value);
    const splitWords = serializedWords.split(' ');

    // Don't force the user to hit space before you count the first word
    const wordCount = splitWords.length && !splitWords[0] ? 0 : splitWords.length;

    setWordsWritten(wordCount);
    setGoalHit(dailyEntry.goalHit || wordCount > wordGoal)
    setValue(newValue);

    const content = JSON.stringify(newValue.toJSON(newValue));

    saveEntry({
      ...dailyEntry,
      content,
      wordCount,
      goalHit,
      date,
    });
  }

  const hasMark = type => value.activeMarks.some(mark => mark.type === type);

  const onClickMark = (event, type) => {
    event.preventDefault();
    editor.toggleMark(type);
  }

  const renderMarkButton = (type) => {
    const isActive = hasMark(type);
    const className = isActive 
      ? 'mx-2 text-white' 
      : 'mx-2 hover:text-white';
    const IconComponent = icons[type];

    if (!IconComponent) {
      return;
    }
    
    return (
      <button
        className={className}
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
    const className = isActive 
      ? 'mx-2 text-white' 
      : 'mx-2 hover:text-white';
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
        className={className}
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
        <div className="bg-secondary p-4 rounded-t-lg text-gray-500 flex justify-center sm:justify-between items-center">
          <div >
            <span className="hidden lg:inline-block mx-4 inline-block relative">
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

          <WordCounter wordsWritten={wordsWritten} wordGoal={wordGoal} goalHit={goalHit} />
        </div>

        <div className="progress-bar sticky p-2 bg-offwhite">
          <div className="progress bg-gray-800 h-2 max-w-full rounded-lg" style={progressBarStyles}></div>
          <StyledConfettiCanon active={goalHit} config={confettiConfig} />
        </div>

        <SlateEditor
          ref={(editorRef) => editor = editorRef}
          className="editor bg-offwhite px-8 pb-8 pt-4 min-h-screen"
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

export default Editor;
