import { useState, useRef, Suspense } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { format } from 'date-fns';

import GetEntries from '../queries/GetEntries';

import withLayout from '../components/Layout';
import withPreloadedQuery from '../components/PreloadedQuery';
import PageHeader from '../components/PageHeader';
import EntriesList from '../components/EntriesList';

const formatFriendly = date => format(new Date(date), 'MMMM d, yyyy');

const Entries = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [enteredToDate, setEnteredToDate] = useState(null);
  const [userEntries, setUserEntries] = useState([]);

  const subtitle = 'View your entries as a never-ending list or by selection on the calendar.';

  // Date Picker config
  let datePicker = useRef();
  const modifiers = {
    start: startDate,
    end: enteredToDate,
    // This method will compare each date
    // reendered on the calendar and let us
    // target it with custom CSS
    entry: date => {
        // Loop through each entries createdAt date and
        // compare it to the date being rendered on the calendar
        for (let i = 0; i < userEntries.length; i++) {
          const createdAt = new Date(userEntries[i].createdAt);
          if (createdAt.getDate() === date.getDate() && createdAt.getMonth() === date.getMonth()) {
            return true;
          }
        }

        return false;
    },
  };
  const disabledDays = { before: startDate };
  const selectedDays = [startDate, { from: startDate, to: enteredToDate }];

  const isSelectingFirstDay = (day) => {
    const isBeforeFirstDay = startDate && DateUtils.isDayBefore(day, startDate);
    const isRangeSelected = startDate && endDate;
    return !startDate || isBeforeFirstDay || isRangeSelected;
  }

  const handleDayClick = (day) => {
    if (startDate && endDate && day >= startDate && day <= endDate) {
      handleResetClick();
      return;
    }

    if (isSelectingFirstDay(day)) {
      setStartDate(day);
      setEndDate(null);
      setEnteredToDate(null);
    } else {
      setEndDate(day);
      setEnteredToDate(day);
    }
  }

  const handleDayMouseEnter = (day) => {
    if (!isSelectingFirstDay(day)) {
      setEnteredToDate(day);
    }
  }

  const handleResetClick = () => {
    setStartDate(null);
    setEndDate(null);
    setEnteredToDate(null);
  }

  const handleTodayClick = () => {
    datePicker.showMonth(new Date());
  }

  return (
    <div>
      <PageHeader title="Entries" subtitle={subtitle} />

      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:block lg:flex-shrink-0 mb-5">
          <DayPicker 
            ref={(datePickerRef) => datePicker = datePickerRef}
            numberOfMonths={2}
            fromMonth={startDate}
            selectedDays={selectedDays}
            disabledDays={disabledDays}
            modifiers={modifiers}
            onDayClick={handleDayClick}
            onDayMouseEnter={handleDayMouseEnter}
          />

          <div className="flex flex-col items-center text-xs">
            {
              startDate && endDate
                ? (
                  <div className="text-center">
                    <div>
                      <span className="text-blue-700 font-bold">
                        {formatFriendly(startDate)}
                      </span>
                      {' '}to{' '}
                      <span className="text-blue-700 font-bold">
                        {formatFriendly(endDate)}
                      </span>
                    </div>

                    <button className="text-blue-500 hover:text-blue-700" onClick={handleResetClick}>
                      Reset
                    </button>
                  </div>
                )
                : (
                  <button className="text-blue-500 hover:text-blue-700" onClick={handleTodayClick}>
                    Show me today
                  </button>
                )
            }
          </div>
        </div>

        <Suspense fallback={<div>Loading entries...</div>}>
          <EntriesList startDate={startDate} endDate={endDate} setUserEntries={setUserEntries} />
        </Suspense>
      </div>
    </div>
  );
};

export default withLayout(
  withPreloadedQuery(Entries, {
    key: '/entries',
    query: GetEntries,
    variables: {
      userID: 'REPLACE_ME',
      startDate: null,
      endDate: null,
    }
  }),
);