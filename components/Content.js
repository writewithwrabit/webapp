import { useState } from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import { FaTimes } from 'react-icons/fa';

const Content = ({ entry }) => {
  let jsonEntry;
  try {
    jsonEntry = JSON.parse(entry.content)
  } catch(e) {
    // TODO: Handle this error
  }

  const initialValue = Value.fromJSON(jsonEntry);

  const [value] = useState(initialValue); 

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

  return (
    <div className="relative flex justify-center w-11/12 md:w-1/2 h-full">
      <SlateEditor
        className="editor bg-offwhite p-8 w-full rounded overflow-y-scroll"
        value={value}
        renderMark={renderMark}
        renderBlock={renderBlock}
      />

      <div className="absolute right-0 m-4">
        <FaTimes />
      </div>
    </div>

  );
};

export default Content;
