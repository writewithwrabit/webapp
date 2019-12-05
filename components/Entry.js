import { format } from 'date-fns'
import { useState } from 'react';

import EntryPopup from '../components/EntryPopup';

const Entry = ({ entry }) => {
  const [display, setDisplay] = useState(false);
  let classes = 'entry bg-white md:ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center border-green-500';

  if (entry.goalHit) {
    classes = `${classes} border`;
  }

  const toggleDisplay = e => {
    const entryContainerClicked = e.target.classList.contains('entry')
      || e.target.parentNode.classList.contains('entry-details')
      || e.target.parentNode.classList.contains('entry');

    const editorClicked = e.target.classList.contains('editor') || e.target.parentNode.classList.contains('editor') || e.target.getAttribute('data-slate-string');

    // Open the popup if it isn't open and we click an entry
    // Close the popup if it is open and you click on something other than the editor
    if (!display && entryContainerClicked || display && !editorClicked) {
      setDisplay(!display);
    }
  };

  return (
    <div
      onClick={toggleDisplay}
      className={classes}
    >
      <div className="entry-details">
        <div className="entry-created-at font-bold pb-2">
          {format(new Date(entry.createdAt), 'MMMM d, yyyy')}
        </div>

        <div className="entry-word-count">
          {entry.wordCount} words written
        </div>

        {entry.wordCount && <EntryPopup entry={entry} display={display} />}
      </div>

      {
        entry.goalHit
          && (
            <div className="text-4xl">
              🎉
            </div>
          )
      }
    </div>
  );
};

export default Entry;