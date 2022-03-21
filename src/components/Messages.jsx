import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels } from '../slices/ChannelsSlice.js';
import { socketContext }  from '../contexts/index.js';
import { selectorMessages } from '../slices/messagesSlice.js'

const ChannelMessages = ({ currentChannelId }) => {
  const messages = useSelector(selectorMessages.selectAll);
  const refChat = useRef();

  useEffect(()=> {
    refChat.current.scrollTop = refChat.current.scrollHeight
  }, [messages]);
  
    return (
        <div className="chat-messages overflow-auto px-5" ref={refChat}>
          {messages.filter(({channelId}) => Number(channelId) === currentChannelId)
            .map(({ id, username, message }) => (
              <div className="text-break mb-2">
                <b>{username}</b>
                ": "
                {message}
              </div> 
            ))
          }
        </div>
    )
};


const FormMessage = ({ currentChannelId }) => {
  const refInput = useRef();
  const socket = useContext(socketContext);
  const username = localStorage.getItem('username');

  const handlerSubmit = ({message}, {resetForm}) => {
    const newMessage =  { message, channelId: currentChannelId, username };
    socket.emit('newMessage', newMessage, (response) => {
      console.log(response);
      console.log(response.status);
      if (response.status === 'ok') {
        resetForm();
        refInput.current.focus();
        //setUploaded(true);
      }
    });
    /*if (socket.connected) {
      socket.emit('newMessage', newMessage);
      resetForm();
    } else {
      console.log('ошибка отправки сообщения');
      console.log(socket.connected);
      console.log(newMessage);
    }*/

  };

  useEffect(() => {
    refInput.current.focus();
  })

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    /*validationSchema: schema,*/
    onSubmit: handlerSubmit,
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1">
        <InputGroup className="mb-3">
          <Form.Control 
            name="message"
            id="message"
            type="text"
            aria-label="message"
            className="p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.message}
            placeholder="Enter message" 
            ref={refInput}
          />
          <Button type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
};


const Messages = () => {
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelId} = useSelector((state) => state.channels);
  const [uploaded, setUploaded] = useState(false);
  console.log(uploaded);
  
  const currentChannelName = channels.filter(({id}) => id === currentChannelId).map((channel) => channel.name);
  return (
  <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">{currentChannelName}</p>
        </div>
        <ChannelMessages currentChannelId={currentChannelId} />
        <FormMessage currentChannelId={currentChannelId}/>
        {setUploaded(true)}
        {console.log(uploaded)}
      </div>
  </Col>
  );
}

export default Messages;