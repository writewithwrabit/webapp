import StatsPanel from '../components/StatsPanel';

const data = (
  <div className="flex flex-col mb-2">
    <span className="bg-gray-200 px-2 py-5 mb-5"></span>
    <span className="bg-gray-200 px-2 py-8 mb-5"></span>
    <span className="bg-gray-200 py-2"></span>
  </div>
);

const StatsPanelsFallback = () => (
  <div className="flex flex-wrap">
    {
      [1, 2, 3, 4, 5]
        .map(id => <StatsPanel key={id} data={data} loading={false} />)
    }
  </div>
);

export default StatsPanelsFallback;
