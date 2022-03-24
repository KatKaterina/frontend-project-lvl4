import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { schemaForChannel as schema } from '../validateSchema';
import { changeCurrentChannel, renameChannel } from '../slices/ChannelsSlice.js';

const FormRenameChannel = ({ handleClose }) => {
    const refName = useRef();
    const socket = useContext(socketContext);
    const dispatch = useDispatch();

    const updateData = useSelector((state) => state.modal.updateData);
    const { channelId, name } = updateData;

    useEffect(() => {
        refName.current.focus();
    }, []);

    const formik = useFormik({
      initialValues: {
        name,
      },
      validationSchema: schema,
      onSubmit: ({ name: newName }) => {
        const updateChannel =  { name: newName, id: channelId };
        socket.emit('renameChannel', updateChannel, (response) => {
          console.log(response);
          const { status } = response;
          if (status === 'ok') {
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
            />
             {formik.errors.name && 
             <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
          </InputGroup>
          <Button onClick={handleClose}>Cancel</Button>
          {' '}
          <Button type="submit">Rename</Button>
      </Form>
    );
};


const ModalAddChannel = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        dispatch(closeModal());
        //resetForm();
    };
    console.log("show: "  + show)
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New name channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormRenameChannel handleClose={handleClose}/>
        </Modal.Body>
      </Modal>
    )
};

export default ModalAddChannel;