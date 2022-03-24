import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { schemaForChannel as schema } from '../validateSchema';

const FormAddChannel = ({ handleClose }) => {
    const refName = useRef();
    const socket = useContext(socketContext);
    //const dispatch = useDispatch();

    useEffect(() => {
        refName.current.focus();
    }, []);

    const formik = useFormik({
      initialValues: {
        name:'',
      },
      validationSchema: schema,
      onSubmit: ({ name }) => {
        const newChannel =  { name };
        console.log('channel ' + newChannel);
        socket.emit('newChannel', newChannel, (response) => {
          if (response.status === 'ok') {
            //dispatch(closeModal());
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
             {console.log(formik.errors.name)}
             {formik.errors.name && 
             <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
          </InputGroup>
          <Button onClick={handleClose}>Cancel</Button>
          {' '}
          <Button type="submit">Add</Button>
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
          <Modal.Title>Add new channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormAddChannel handleClose={handleClose}/>
        </Modal.Body>
      </Modal>
    )
};

export default ModalAddChannel;