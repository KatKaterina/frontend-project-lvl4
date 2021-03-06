import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import React, {
  useEffect, useContext, useRef, useState,
} from 'react';
import {
  Form, Button, InputGroup, Modal,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext } from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { getSchemaForChannel } from '../validateSchema';

const FormRenameChannel = ({ handleClose, t }) => {
  const refName = useRef();
  const socket = useContext(socketContext);
  const channels = useSelector((state) => state.channels).channels.map((channel) => channel.name);

  const updateData = useSelector((state) => state.modal.updateData);
  const { id, name } = updateData;

  useEffect(() => {
    refName.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name,
    },
    validationSchema: getSchemaForChannel(channels),
    onSubmit: ({ name: newName }, { setSubmitting }) => {
      setSubmitting(true);
      const updateChannel = { name: newName, id, removable: true };

      socket.emit('renameChannel', updateChannel, (response) => {
        const { status } = response;
        if (status === 'ok') {
          // dispatch(fetchData());
          setSubmitting(false);
          toast(t('toast.renamedChannel'));
          handleClose();
        } else {
          toast.error(t('toast.connectError'));
        }
      });
    },
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
        <Form.Label visuallyHidden>{t('elements.nameChannel')}</Form.Label>
        {formik.errors.name
          && <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>}
      </InputGroup>
      <Button onClick={handleClose} disabled={formik.isSubmitting}>{t('elements.buttonCancel')}</Button>
      {' '}
      <Button type="submit" disabled={formik.isSubmitting}>{t('elements.buttonAdd')}</Button>
    </Form>
  );
};

const ModalRenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    dispatch(closeModal());
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('elements.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormRenameChannel handleClose={handleClose} t={t} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
