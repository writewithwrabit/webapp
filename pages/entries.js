import { useState, useRef, Suspense } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { format, startOfDay, endOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import dynamic from 'next/dynamic';
import { preloadQuery } from 'react-relay/hooks';
import { useStoreState, useStoreActions } from 'easy-peasy';

import createRelayEnvironment from '../lib/relay/createRelayEnvironment';
const environment = createRelayEnvironment();

import GetEntries from '../queries/GetEntries';

import withLayout from '../components/Layout';
import withPreloadedQuery from '../components/PreloadedQuery';
import PageHeader from '../components/PageHeader';
import EntriesListFallback from '../components/EntriesListFallback';

const EntriesList = dynamic(
  () => import('../components/EntriesList'),
  { ssr: false }
);

const timezoneOffsetHours = new Date().getTimezoneOffset();

const formatFriendly = date => format(new Date(date), 'MMMM d, yyyy');

const Entries = () => {
  const setPreloadedQuery = useStoreActions(actions => actions.pages.setPreloadedQuery);
  const user = useStoreState(state => state.user);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [enteredToDate, setEnteredToDate] = useState(null);
  const [userEntries, setUserEntries] = useState([]);

  // TODO: Make it impossible to get here without a user
  if (user.firebaseData) {
    // Update the preloaded query if the dates change
    const preloadedQuery = preloadQuery(
      environment,
      GetEntries,
      {
        userID: user.firebaseData.uid,
        startDate: startDate && format(
          zonedTimeToUtc(startOfDay(startDate), timezoneOffsetHours),
          'yyyy-MM-dd HH:mm:ss.000'
        ),
        endDate: endDate && format(
          zonedTimeToUtc(endOfDay(endDate), timezoneOffsetHours),
          'yyyy-MM-dd HH:mm:ss.000'
        ),
      },
    );

    setPreloadedQuery({ key: '/entries', preloadedQuery });
  }

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

        <Suspense fallback={<EntriesListFallback />}>
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
    },
  }),
);