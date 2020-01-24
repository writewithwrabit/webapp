import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

const icons = {
  bold: FaBold,
  italic: FaItalic,
  underlined: FaUnderline,
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

export default MarkButton;
