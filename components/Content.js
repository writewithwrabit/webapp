import { useState } from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

const Content = ({ entry }) => {
  console.log(entry);
  let jsonEntry;
  try {
    jsonEntry = JSON.parse(entry.content)
  } catch(e) {
    console.log('Invalid JSON passed, probably a new entry.');
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
    <SlateEditor
      className="editor bg-offwhite p-8 w-1/2 h-full rounded"
      value={value}
      renderMark={renderMark}
      renderBlock={renderBlock}
    />
  );
};

export default Content;
