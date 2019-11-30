const EntriesListFallback = () => (
  <div className="w-full flex-grow">
    {
      [1,2,3]
        .map(id => (
          <div key={id} className="bg-white md:ml-5 mb-5 px-10 py-5 rounded shadow-md flex justify-between items-center border-green-500">
            <div className="zkdsldklk">
              <div className="font-bold p-3 w-32 mb-2 bg-gray-200">
              </div>

              <div className="bg-gray-200 p-3">
              </div>
            </div>

            <div className="bg-gray-200 p-4">
            </div>
          </div>
        ))
    }
  </div>
);

export default EntriesListFallback;
