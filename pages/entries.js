import { useState, useRef } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import gql from "graphql-tag";
import { format, startOfDay, endOfDay } from 'date-fns'
import { useQuery } from '@apollo/react-hooks';
import { useStoreState } from 'easy-peasy';
import { zonedTimeToUtc } from 'date-fns-tz';

import withLayout from '../components/Layout';
import EntriesList from '../components/EntriesList';

const GET_ENTRIES = gql`
  query UserEntries($userID: ID!, $startDate: String, $endDate: String) {
    entriesByUserID(userID: $userID, startDate: $startDate, endDate: $endDate) {
      id
      wordCount
      createdAt
    }
  }
`;

const timezoneOffset = new Date().getTimezoneOffset();

const formatFriendly = date => format(new Date(date), 'MMMM d, yyyy');

const Entries = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [enteredToDate, setEnteredToDate] = useState(null);

  // GraphQL Query
  const { uid: userID } = useStoreState(state => state.user).firebaseData;
  const utcStartDate = startDate ? zonedTimeToUtc(startOfDay(startDate), timezoneOffset) : null;
  const utcEndDate = endDate ? zonedTimeToUtc(endOfDay(endDate), timezoneOffset) : null;
  const { loading, error, data } = useQuery(GET_ENTRIES, {
    variables: {
      userID,
      startDate: utcStartDate,
      endDate: utcEndDate,
    },
  });

  // Date Picker config
  let datePicker = useRef();
  const modifiers = {
    start: startDate,
    end: enteredToDate,
    entries: [],
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

      <EntriesList data={data} loading={loading} error={error} />
    </div>
  );
};

export default withLayout(Entries);