import styled from '@emotion/styled';

const StyledOption = styled.div`
  text-transform: capitalize;
  font-weight: ${props => props.selected && 'bold'};
  color: ${props => props.selected && '#FA557D'};

  &:hover {
    cursor: pointer;
    color: #FA557D;
  }
`;

const menuOptions = [
  'account',
  'editor',
  'notifications',
];

const SettingsMenu = ({ selected, selectOption }) => (
  <menu className="w-1/5 mt-0 p-0">
    {menuOptions.map(option => (
      <StyledOption
        className="mr-4 p-2"
        key={option}
        onClick={() => selectOption(option)}
        selected={selected === option}
      >
        {option}
      </StyledOption>
    ))}
  </menu>
);

export default SettingsMenu;
