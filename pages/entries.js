import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useStoreState } from 'easy-peasy';
import { useState, useRef } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import withLayout from '../components/Layout';

const GET_ENTRIES = gql`
  query UserEntries($userID: ID!) {
    entriesByUserID(userID: $userID) {
      id
      wordCount
      createdAt
    }
  }
`;

const renderEntries = (entries) => {
  return entries.map(entry => (
    <div key={entry.id} className="bg-white ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center">
      <div>
        <div>
          {entry.createdAt}
        </div>

        <div>
          {entry.wordCount} words written
        </div>
      </div>

      <div>
        0 day streak!
      </div>
    </div>
  ));
}

const Entries = () => {
  const { uid: userID } = useStoreState(state => state.user).firebaseData;
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
    <Query query={GET_ENTRIES} variables={{ userID }}>
      {({ loading, error, data}) => {
        if (loading) return (<div>LOADING</div>);
        if (error) return (<div>ERROR</div>);

        const entries = renderEntries(data.entriesByUserID);

        return (
          <div className="flex">
            <div className="lg:flex-none">
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

              <div className="flex flex-col items-center">
                <button onClick={handleTodayClick}>Go to today</button>

                {
                  startDate && endDate
                  && `Viewing from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
                }
                {
                  startDate && endDate
                  && (
                    <button className="link" onClick={handleResetClick}>
                      Reset
                    </button>
                  )
                }
              </div>
            </div>

            <div className="w-full first-child:-mt-10 flex-grow">
              {entries}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withLayout(Entries);