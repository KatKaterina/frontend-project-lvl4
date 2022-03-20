import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels } from '../slices/ChannelsSlice.js';

const Message = () => {

    return (
        <div className="chat-message overflow-auto px-5">
            <div className="text-break mb-2">
              <b>Имя</b>
              ": "
              "сообщение"
            </div>
        </div>
    )
}

/*const MessageHeader = () => {

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">{currentChannelName}</p>
    </div>
    <Message/>
  )
}*/

const Messages = () => {
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelId} = useSelector((state) => state.channels);

  const currentChannelName = channels.filter(({id}) => id === currentChannelId).map((channel) => channel.name);
  return (
  <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">{currentChannelName}</p>
        </div>
        <Message />
        <h1>messages</h1>
      </div>
  </Col>
  );
}

export default Messages;