const ChatLink = ({ children }) => {
  const handleClick = () => {
    if ($crisp) {
      $crisp.push(['do', 'chat:open']);
    }
  }

  return (
    <a onClick={handleClick}>
      {children}
    </a>
  );
}

export default ChatLink;
