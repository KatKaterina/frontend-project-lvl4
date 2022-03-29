import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { getSchemaForChannel } from '../validateSchema';
import { fetchData, selectorChannels } from '../slices/ChannelsSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


const FormRenameChannel = ({ handleClose, t }) => {
  const refName = useRef();
  const socket = useContext(socketContext);
  const dispatch = useDispatch();
  const channels = useSelector(selectorChannels.selectAll).map((channel) => channel.name);

  const updateData = useSelector((state) => state.modal.updateData);
  const { id, name, removable } = updateData;

  useEffect(() => {
    refName.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name,
    },
    validationSchema: getSchemaForChannel(channels),
    onSubmit: ({ name: newName }, { setSubmitting, isSubmitting }) => {
      setSubmitting(true);
      const updateChannel =  { name: newName, id, removable: true };
      
       socket.emit('renameChannel', updateChannel, (response) => {
        const { status, nameNew } = response;
        //console.log("emit " + nameNew);
        if (status === 'ok') {
          console.log("emit " + nameNew);
          //dispatch(fetchData());
          setSubmitting(false);
          toast(t('toast.renamedChannel'));
          //dispatch(fetchData());
          console.log('новое имя ' + newName);
          handleClose();
          //dispatch(fetchData());
        } else {
          toast.error(t('toast.connectError'));
        }
      })
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          name="name"
          className="mb-2"
          aria-label={t('elements.nameChannel')}
          data-testid="rename-channel"
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={formik.errors.name}
          readOnly={formik.isSubmitting}
          ref={refName}
        />
        {formik.errors.name && 
          <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>}
      </InputGroup>
      <Button onClick={handleClose} disabled={formik.isSubmitting}>{t('elements.buttonCancel')}</Button>
      {' '}
      <Button type="submit" disabled={formik.isSubmitting}>{t('elements.buttonAdd')}</Button>
    </Form>
  );
};

const ModalRenameChannel = ({ onExited }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const handleClose = () => {
    dispatch(fetchData());
    setShow(false);
    //dispatch(closeModal());
  };

  return (
    <Modal show={show} onHide={handleClose} centered onExited={onExited}>
      <Modal.Header closeButton>
        <Modal.Title>{t('elements.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormRenameChannel handleClose={handleClose} t={t}/>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;