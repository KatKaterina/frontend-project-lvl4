import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { getSchemaForChannel } from '../validateSchema';
import { changeCurrentChannel, selectorChannels } from '../slices/ChannelsSlice.js';
import { useTranslation } from 'react-i18next';

import store from '../slices/index.js';

const FormAddChannel = ({ handleClose, t }) => {
    const refName = useRef();
    const socket = useContext(socketContext);
    const dispatch = useDispatch();
    const channels = useSelector(selectorChannels.selectAll).map((channel) => channel.name);

    useEffect(() => {
        refName.current.focus();
    }, []);

    const formik = useFormik({
      initialValues: {
        name:'',
      },
      validationSchema: getSchemaForChannel(channels),
      onSubmit: ({ name }, { setSubmitting }) => {
        setSubmitting(true);
        const newChannel =  { name };
        //console.log('channel ' + newChannel);
        socket.emit('newChannel', newChannel, (response) => {
          const { status } = response;
          if (status === 'ok') {
            setSubmitting(false);
            //dispatch(closeModal());
            //dispatch(changeCurrentChannel({ id }));
            handleClose();
           
          } else {
            //alert('Ошибка соединения, повторите отправку сообщения.')
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
              readOnly={formik.isSubmitting}
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


const ModalAddChannel = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        dispatch(closeModal());
        //resetForm();
    };
    //console.log("show: "  + show)
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('elements.addChannel')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormAddChannel handleClose={handleClose} t={t}/>
        </Modal.Body>
      </Modal>
    )
};

export default ModalAddChannel;