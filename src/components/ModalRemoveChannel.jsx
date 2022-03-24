import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { socketContext }  from '../contexts/index.js';
import { closeModal } from '../slices/modalSlice.js';
import { schemaForChannel as schema } from '../validateSchema';
import { changeCurrentChannel, renameChannel } from '../slices/ChannelsSlice.js';

const handleRemove = () => {
  const socket = useContext(socketContext);
  const updateData = useSelector((state) => state.modal.updateData);
  const { channelId } = updateData;
  const removeChannel =  { id: channelId };
 
  socket.emit('removeChannel', removeChannel, (response) => {
    //console.log(response);
    const { status } = response;
    if (status === 'ok') {
      handleClose();
    } else {
      //alert('Ошибка соединения, повторите отправку сообщения.')
    }
  });
}

/*const FormRemoveChannel = ({ handleClose }) => {
    const refName = useRef();

    const dispatch = useDispatch();

 

    useEffect(() => {
        refName.current.focus();
    }, []);

    const formik = useFormik({
      initialValues: {
        name,
      },
      validationSchema: schema,
      onSubmit: ({ channelId }) => {
        const removeChannel =  { id: channelId };
        console.log(updateChannel);
        socket.emit('removeChannel', updateChannel, (response) => {
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
};*/


const ModalAddChannel = () => {
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
          <Modal.Title>Remove channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancel</Button>
          {' '}
          <Button onClick={handleRemove}>Remove</Button>
        </Modal.Footer>
      </Modal>
    )
};

export default ModalAddChannel;