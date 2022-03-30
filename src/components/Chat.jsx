import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { fetchData } from '../slices/ChannelsSlice.js';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';
import { closeModal } from '../slices/modalSlice.js';

const renderModal = (type, onExited) => {
  switch (type) {
    case 'addChannel': {
      return <ModalAddChannel onExited={onExited} />;
    }
    case 'renameChannel': {
      return <ModalRenameChannel onExited={onExited} />;
    }
    case 'removeChannel': {
      return <ModalRemoveChannel onExited={onExited} />;
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

  const ModalExited = () => {
    dispatch(closeModal());
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        {renderModal(type, ModalExited)}
      </Row>
    </div>
  );
};

export default Chat;

/* <div className="text-center">
<span>
  <Link to="/login" onClick={handleClick}>{t('elements.logOut')}</Link>
</span>
</div> */
