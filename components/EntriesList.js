import Entry from '../components/Entry';

const EntriesList = ({ data, loading, error }) => {
  if (loading) return (<div>LOADING</div>);
  if (error) return (<div>ERROR</div>);

  return (
    <div className="w-full flex-grow">
      {
        data.entriesByUserID
          .map(entry => <Entry key={entry.id} entry={entry} />)
      }
    </div>
  );
};

export default EntriesList;