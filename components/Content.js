import { useState, useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { FaTimes } from 'react-icons/fa';

import slateConverter from '../lib/slateConverter';

import EditorLeaf from './EditorLeaf';
import EditorElement from './EditorElement';

const Content = ({ entry }) => {
  // Editor methods
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback(props => <EditorLeaf {...props} />, []);
  const renderElement = useCallback(props => <EditorElement {...props} />, []);

  let jsonEntry;
  try {
    jsonEntry = JSON.parse(entry.content);

    // Convert to new Slate version
    if (!Array.isArray(jsonEntry)) {
      jsonEntry = slateConverter(jsonEntry);
    }
  } catch(e) {
    // TODO: Handle this error?
  }

  const [value] = useState(jsonEntry); 

  return (
    <div className="relative flex justify-center w-11/12 md:w-1/2 h-full">
      <Slate
        editor={editor}
        value={value}
        onChange={() => {}}
      >
        <Editable
          className="editor bg-offwhite p-8 w-full rounded overflow-y-scroll"
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </Slate>

      <div className="absolute right-0 m-4">
        <FaTimes />
      </div>
    </div>

  );
};

export default Content;
