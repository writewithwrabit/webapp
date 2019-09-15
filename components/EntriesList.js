import { format, subMinutes } from 'date-fns'

const timezoneOffset = new Date().getTimezoneOffset();

const formatFriendly = date => {
  const localDate = subMinutes(new Date(date), timezoneOffset);
  return format(localDate, 'MMMM d, yyyy');
};

const renderEntries = (entries) => {
  return entries.map(entry => (
    <div key={entry.id} className="bg-white md:ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center">
      <div>
        <div>
          {formatFriendly(entry.createdAt)}
        </div>

        <div>
          {entry.wordCount} words written
        </div>
      </div>

      {/* <div>
        0 day streak!
      </div> */}
    </div>
  ));
}

const EntriesList = ({ data, loading, error }) => {
  if (loading) return (<div>LOADING</div>);
  if (error) return (<div>ERROR</div>);

  const entries = renderEntries(data.entriesByUserID);

  return (
    <div className="w-full flex-grow">
      {entries}
    </div>
  );
};

export default EntriesList;