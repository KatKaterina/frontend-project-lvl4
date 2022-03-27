import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { schemaForChannel as schema } from '../validateSchema';
import { changeCurrentChannel, renameChannel } from '../slices/ChannelsSlice.js';
import { fetchData } from '../slices/ChannelsSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ModalAddChannel = () => {
  const { t } = useTranslation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        dispatch(closeModal());
        //resetForm();
    };

    const socket = useContext(socketContext);
    const updateData = useSelector((state) => state.modal.updateData);
    console.log("updateData");
    console.log(updateData);

    const handleRemove = () => {
 
      const { id } = updateData;
      const removeChannel =  { id };
     
      socket.emit('removeChannel', removeChannel, (response) => {
        console.log("response");
        console.log(response);
        const { status } = response;
        if (status === 'ok') {
          handleClose();
          dispatch(fetchData());
          toast.success(t('toast.removedChannel'));
        } else {
          toast.error(t('toast.connectError'));
        }
      });
    }
    //console.log("show: "  + show)
    return (
      <Modal show={show} onHide={handleClose} centered>
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
    )
};

export default ModalAddChannel;