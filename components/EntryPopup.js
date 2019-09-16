import Content from '../components/Content';

const EntryPopup = ({ entry, display }) => {
  return (
    <div>
      {
        display
          ? (
            <div className="popup popup-entry w-screen h-screen absolute top-0 left-0 py-8 flex justify-center">
              <Content entry={entry} />
            </div>
          )
          : ''
      }
    </div>
  );
};

export default EntryPopup;