import { format } from 'date-fns'
import { useState } from 'react';
import { utcToZonedTime } from 'date-fns-tz';
import styled from '@emotion/styled';
import { startOfDay, isEqual } from 'date-fns';

const timezoneOffset = new Date().getTimezoneOffset();

import EntryPopup from '../components/EntryPopup';
import DeleteEntryButton from '../components/DeleteEntryButton';

const StyledEntry = styled.div`
  cursor: pointer;

  &:hover {
    margin-left: 0.5rem;

    & button {
      display: block;
    }

    & .goal-hit {
      display: none;
    }
  }
`;

const date = startOfDay(new Date());

const Entry = ({ entry }) => {
  const [display, setDisplay] = useState(false);
  const localEntryDate = new Date(utcToZonedTime(entry.createdAt, timezoneOffset));
  let classes = 'bg-white md:ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center border-green-500';

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
    <StyledEntry
      onClick={toggleDisplay}
      className={classes}
    >
      <div className="entry-details">
        <div className="entry-created-at font-bold pb-2">
          {format(localEntryDate, 'MMMM d, yyyy')}
        </div>

        <div className="entry-word-count">
          {entry.wordCount} words written
        </div>

        {entry.wordCount && <EntryPopup entry={entry} display={display} />}
      </div>

      {
        entry.goalHit
          && (
            <div className="goal-hit text-4xl">
              🎉
            </div>
          )
      }

      {
        // Don't allow the daily entry to be deleted
        // they can just go write in it
        !isEqual(localEntryDate, date) &&
        <DeleteEntryButton entryID={entry.id} />
      }
    </StyledEntry>
  );
};

export default Entry;