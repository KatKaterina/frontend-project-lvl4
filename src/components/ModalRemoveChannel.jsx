import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { fetchData } from '../slices/ChannelsSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ModalRemoveChannel = ({ onExited }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    //dispatch(closeModal());
  };

  const socket = useContext(socketContext);
  const updateData = useSelector((state) => state.modal.updateData);

  const handleRemove = () => {
    const { id } = updateData;
    const removeChannel =  { id };
    
    socket.emit('removeChannel', removeChannel, (response) => {
      const { status } = response;
      if (status === 'ok') {
        toast(t('toast.removedChannel'));
        handleClose();
        dispatch(fetchData());
      } else {
        toast.error(t('toast.connectError'));
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered onExited={onExited}>
      <Modal.Header closeButton>
        <Modal.Title>{t('elements.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('elements.confirmquestion')}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>{t('elements.buttonCancel')}</Button>
        {' '}
        <Button onClick={handleRemove}>{t('elements.buttonRemove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoveChannel;