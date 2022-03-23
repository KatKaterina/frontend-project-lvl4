import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';

const FormAddChannel = ({ handleClose }) => {
    const refName = useRef();
    const socket = useContext(socketContext);
    const dispatch = useDispatch();

    useEffect(() => {
        refName.current.focus();
    }, []);

    const formik = useFormik({
      initialValues: {
        name:'',
      },
      onSubmit: ({ name }) => {
        const newChannel =  { name };
        socket.emit('newChannel', newChannel, (response) => {
          if (response.status === 'ok') {
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
              ref={refName}
            />
            <Button type="button" onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </InputGroup>
      </Form>
    );
};


const ModalAddChannel = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    return (
      <Modal.Dialog show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormAddChannel handleClose={handleClose}/>
        </Modal.Body>
      </Modal.Dialog>
    )
};

export default ModalAddChannel;