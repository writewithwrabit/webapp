import { useState, useRef } from 'react';
import { format } from 'date-fns'
import DayPicker, { DateUtils } from 'react-day-picker';
import DayPickerInput from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';

import withLayout from '../components/Layout';
import EntriesList from '../components/EntriesList';

const formatFriendly = date => format(new Date(date), 'MMMM d, yyyy');

const Entries = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [enteredToDate, setEnteredToDate] = useState(null);

  // Date Picker config
  let datePicker = useRef();
  const modifiers = { start: startDate, end: enteredToDate };
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
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="md:block lg:flex-none mb-5">
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

      <EntriesList startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default withLayout(Entries);