import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const Message = () => {
    return (
        <div className="chat-message overflow-auto px-5">
            <h1>messages</h1>
        </div>
    )
}

const Messages = () => {
  <Col className="h-100">
      <div className="d-flex flex-column h-100">
          <Message />
      </div>
  </Col>
}

export default Messages;