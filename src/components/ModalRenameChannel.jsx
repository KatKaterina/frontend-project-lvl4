import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { getSchemaForChannel } from '../validateSchema';
import { changeCurrentChannel, renameChannel } from '../slices/ChannelsSlice.js';
import { fetchData, selectorChannels } from '../slices/ChannelsSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


const FormRenameChannel = ({ handleClose, t }) => {
    const refName = useRef();
    const socket = useContext(socketContext);
    const dispatch = useDispatch();
    const channels = useSelector(selectorChannels.selectAll).map((channel) => channel.name);

    const updateData = useSelector((state) => state.modal.updateData);
    const { id, name } = updateData;
    console.log(updateData);
    

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
        const updateChannel =  { name: newName, id };
        console.log(updateChannel);
        console.log(socket);
        socket.emit('renameChannel', updateChannel, (response) => {
          console.log(response);
          const { status } = response;
          if (status === 'ok') {
            setSubmitting(false);
            handleClose();
            dispatch(fetchData());
            toast.success(t('toast.renamedChannel'));
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
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
              ref={refName}
            />
             {formik.errors.name && 
             <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>}
          </InputGroup>
          <Button onClick={handleClose} disabled={formik.isSubmitting}>{t('elements.buttonCancel')}</Button>
          {' '}
          <Button type="submit" disabled={formik.isSubmitting}>{t('elements.renameChannel')}</Button>
      </Form>
    );
};


const ModalAddChannel = () => {
  const { t } = useTranslation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        dispatch(closeModal());
        //dispatch()
        //resetForm();
    };
    //console.log("show: "  + show)
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('elements.renameChannel')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormRenameChannel handleClose={handleClose} t={t}/>
        </Modal.Body>
      </Modal>
    )
};

export default ModalAddChannel;