const StatsPanel = ({text, data, loading}) => (
  <div className="bg-white p-8 m-4 rounded shadow-md inline-block text-center flex-shrink-0 flex-grow flex flex-col justify-center">
    <div className="text-6xl font-bold">
      {
        loading
          ? 'Loading...'
          : data
      }
    </div>

    <div className="text-gray-600">
      {text}
    </div>
  </div>
);

export default StatsPanel;
