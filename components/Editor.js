import { usePreloadedQuery, useLazyLoadQuery } from 'react-relay/hooks';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createEditor, Node, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { startOfDay } from 'date-fns';

import slateConverter from '../lib/slateConverter';

import { FaBold, FaItalic, FaUnderline, FaQuoteLeft, FaListOl, FaListUl } from 'react-icons/fa';
import ProgressBar from './ProgressBar';
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

const emptyDocument = [{
  type: 'paragraph',
  children: [{ text: '' }],
}];

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
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
      return <p {...attributes}>{children}</p>;
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
}

const BlockButton = ({ format }) => {
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

const BlockTypeOption = ({
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

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

const MarkButton = ({ format }) => {
  const editor = useSlate();

  const className = isMarkActive(editor, format) 
    ? 'mx-2 text-white' 
    : 'mx-2 hover:text-white';

  const IconComponent = icons[format];

  return (
    <button
    className={className}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <IconComponent />
    </button>
  );
}

const EditorContainer = () => {
  const { '/write': preloadedQuery } = useStoreState(state => state.pages.preloadedQueries);
  const { dailyEntry } = usePreloadedQuery(GetEntry, preloadedQuery);

  // Editor methods
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  const date = startOfDay(new Date());

  let jsonEntry;
  try {
    jsonEntry = JSON.parse(dailyEntry.content);

    // Convert to new Slate version
    if (!Array.isArray(jsonEntry)) {
      jsonEntry = slateConverter(jsonEntry);
    }
  } catch(e) {
    // TODO: Handle this error?
  }

  const saveEntry = useStoreActions(actions => actions.editor.saveEntry);

  const blockSelectorDropdown = useRef();

  const [value, setValue] = useState(jsonEntry || emptyDocument); 
  
  const { firebaseData } = useStoreState(state => state.user);
  const { wordGoal } = useLazyLoadQuery(GetWordGoal, { userID: firebaseData.uid, date });
  const [wordsWritten, setWordsWritten] = useState(0);
  const [goalHit, setGoalHit] = useState(dailyEntry.goalHit);
  const percentWordsRemaining = ((wordsWritten / wordGoal) * 100).toFixed(2);

  const [blockSelectorState, setBlockSelectorState] = useState(false);
  const blockSelectorStyles = {
    display: blockSelectorState ? 'block' : 'none',
  };
  const [selectedBlockType, setBlockType] = useState('Paragraph');

  const handleChange = (newValue) => {
    const words = newValue
      .flatMap(n => Node.string(n).split(' '));

      // Don't force the user to hit space before you count the first word
      const wordCount = words.length && !words[0] ? 0 : words.length;

    setWordsWritten(wordCount);
    setGoalHit(dailyEntry.goalHit || wordCount > wordGoal)
    setValue(newValue);

    const content = JSON.stringify(newValue);

    saveEntry({
      ...dailyEntry,
      content,
      wordCount,
      goalHit,
      date,
    });
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
        <Slate
          editor={editor}
          value={value}
          onChange={handleChange}
        >
          <div className="sticky top-0 z-10">
            <div className="bg-secondary p-4 rounded-t-lg text-gray-500 flex justify-center sm:justify-between items-center">
              <div>
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
                      <BlockTypeOption format="paragraph" displayName="Paragraph" setBlockType={setBlockType} setBlockSelectorState={setBlockSelectorState} />
                      <BlockTypeOption format="heading-one" displayName="Heading 1" setBlockType={setBlockType} setBlockSelectorState={setBlockSelectorState} />
                      <BlockTypeOption format="heading-two" displayName="Heading 2" setBlockType={setBlockType} setBlockSelectorState={setBlockSelectorState} />
                      <BlockTypeOption format="heading-three" displayName="Heading 3" setBlockType={setBlockType} setBlockSelectorState={setBlockSelectorState} />
                    </div>
                  </span>
                </span>

                <span className="mx-4">
                  <MarkButton format="bold" />
                  <MarkButton format="italic" />
                  <MarkButton format="underlined" />
                </span>

                <span className="mx-4">
                  <BlockButton format="block-quote" />
                  <BlockButton format="numbered-list" />
                  <BlockButton format="bulleted-list" />
                </span>
              </div>

              <WordCounter wordsWritten={wordsWritten} wordGoal={wordGoal} goalHit={goalHit} />
            </div>

            <ProgressBar goalHit={goalHit} percentWordsRemaining={percentWordsRemaining} />
          </div>


          <Editable
            className="editor bg-offwhite px-8 pb-8 pt-4 min-h-screen"
            placeholder={`Hope you're having a great day, time to write!`}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            autoFocus
            spellCheck
          />
        </Slate>
      </div>
    </div>
  );
};

export default EditorContainer;
