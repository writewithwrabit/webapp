import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import EditorLeaf from './EditorLeaf';
import EditorElement from './EditorElement';
import { BlockButton, BlockTypeOption } from './EditorBlocks';
import MarkButton from './EditorMarks';
import ProgressBar from './ProgressBar';
import WordCounter from './WordCounter';

const emptyDocument = [{
  type: 'paragraph',
  children: [{ text: '' }],
}];

const LandingEditor = () => {
  // Editor methods
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback(props => <EditorLeaf {...props} />, []);
  const renderElement = useCallback(props => <EditorElement {...props} />, []);

  const blockSelectorDropdown = useRef();

  const [value, setValue] = useState(emptyDocument); 
  
  const wordGoal = 50;
  const [wordsWritten, setWordsWritten] = useState(0);
  const [goalHit, setGoalHit] = useState(false);
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
    setGoalHit(wordCount > wordGoal)
    setValue(newValue);
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
          <div>
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

export default LandingEditor;
