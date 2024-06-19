import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';

const ChatIconComponent = ({ onClick }) => {
  return (
    <div className="chat-icon" onClick={onClick}>
      <ChatIcon style={{ fontSize: 40 }} />
    </div>
  );
};

export default ChatIconComponent;
