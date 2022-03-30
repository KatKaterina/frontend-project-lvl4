import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { fetchData } from '../slices/ChannelsSlice.js';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';

const renderModal = (type) => {
  switch (type) {
    case 'addChannel': {
      return <ModalAddChannel />;
    }
    case 'renameChannel': {
      return <ModalRenameChannel />;
    }
    case 'removeChannel': {
      return <ModalRemoveChannel />;
    }
    default: {
      return null;
    }
  }
};

const Chat = () => {
  const { type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        {renderModal(type)}
      </Row>
    </div>
  );
};

export default Chat;
