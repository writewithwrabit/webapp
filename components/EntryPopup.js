import Content from '../components/Content';
import styled from '@emotion/styled';

const EntryPopup = ({ entry, display }) => {
  const StyledDiv = styled.div`
    top: ${window.scrollY}px;
  `;

  if (display) {
    document.body.classList.add('popup-open');
  } else {
    document.body.classList.remove('popup-open');
  }

  return (
    <>
      {
        display
          && (
            <StyledDiv className="popup popup-entry w-screen h-screen absolute left-0 py-8 flex justify-center">
              <Content entry={entry} />
            </StyledDiv>
          )
      }
    </>
  );
};

export default EntryPopup;