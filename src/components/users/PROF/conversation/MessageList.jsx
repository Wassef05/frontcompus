import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../../../../actions/message.actions';
import './MessageList.css';

const MessageList = ({ receiverId, additionalMessages }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    if (receiverId) {
      dispatch(getMessages(receiverId));
    }
  }, [receiverId, dispatch]);

  useEffect(() => {
    if (messages && receiverId) {
      setFilteredMessages(messages.filter((message) => message.receiver === receiverId));
    }
  }, [messages, receiverId]);

  return (
    <div className="message-list">
      {additionalMessages.map((message, index) => (
        <div key={index} className="message sent">
          <p>{message.content}</p>
        </div>
      ))}
      {filteredMessages.map((message, index) => (
        <div key={index} className={`message ${message.sender === receiverId ? 'received' : 'sent'}`}>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
