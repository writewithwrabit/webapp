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

  const toggleDisplay = () => setDisplay(!display);

  return (
    <div
      onClick={toggleDisplay}
      className="entry bg-white md:ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center"
    >
      <div>
        <div>
          {formatFriendly(entry.createdAt)}
        </div>

        <div>
          {entry.wordCount} words written
        </div>

        {
          entry.wordCount
            ? <EntryPopup entry={entry} display={display} />
            : ''
        }
      </div>

      {/* <div>
        0 day streak!
      </div> */}
    </div>
  );
};

export default Entry;