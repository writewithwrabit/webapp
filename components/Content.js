import { useState, useMemo, useCallback } from 'react';
import { createEditor, Node, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { FaTimes } from 'react-icons/fa';

import slateConverter from '../lib/slateConverter';

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

const Content = ({ entry }) => {
  // Editor methods
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  let jsonEntry;
  try {
    jsonEntry = JSON.parse(entry.content);

    // Convert to new Slate version
    if (!Array.isArray(jsonEntry)) {
      jsonEntry = slateConverter(jsonEntry);
      console.log(jsonEntry);
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
