import { format, subMinutes } from 'date-fns'
import { useState } from 'react';

import EntryPopup from '../components/EntryPopup';

const timezoneOffset = new Date().getTimezoneOffset();

const formatFriendly = date => {
  const localDate = subMinutes(new Date(date), timezoneOffset);
  return format(localDate, 'MMMM d, yyyy');
};

const Entry = ({ entry }) => {
  const [display, setDisplay] = useState(false);

  const toggleDisplay = e => {
    const entryContainerClicked = e.target.classList.contains('entry')
      || e.target.parentNode.classList.contains('entry-details')
      || e.target.parentNode.classList.contains('entry');

    const editorClicked = e.target.classList.contains('editor') || e.target.parentNode.classList.contains('editor');

    // Open the popup if it isn't open and we click an entry
    // Close the popup if it is open and you click on something other than the editor
    if (!display && entryContainerClicked || display && !editorClicked) {
      setDisplay(!display);
    }
  };

  return (
    <div
      onClick={toggleDisplay}
      className="entry bg-white md:ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center"
    >
      <div className="entry-details">
        <div className="entry-created-at font-bold pb-2">
          {formatFriendly(entry.createdAt)}
        </div>

        <div className="entry-word-count">
          {entry.wordCount} words written
        </div>

        {
          entry.wordCount
            ? <EntryPopup entry={entry} display={display} />
            : ''
        }
      </div>
{/* 
      <div>
        0 day streak!
      </div> */}
    </div>
  );
};

export default Entry;