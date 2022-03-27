// @ts-check

import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels } from '../slices/ChannelsSlice.js';
import { socketContext }  from '../contexts/index.js';
import { selectorMessages, addMessage, fetchMessages } from '../slices/messagesSlice.js';
import { fetchData, changeCurrentChannel } from '../slices/ChannelsSlice.js';
import { useTranslation } from 'react-i18next';
//import  filter  from 'leo-profanity';
import { toast } from 'react-toastify';


const ChannelMessages = ({ currentChannelId }) => {
  const messages = useSelector(selectorMessages.selectAll);
  const refChat = useRef();
  const dispatch = useDispatch();
  
  useEffect(()=> {
    refChat.current.scrollTop = refChat.current.scrollHeight
  }, [messages]);
  
    return (
        <div className="chat-messages overflow-auto px-5" ref={refChat}>
          {messages.filter(({channelId}) => Number(channelId) === currentChannelId)
            .map(({ id, username, message }) => (
              <div className="text-break mb-2">
                <b>{username}</b>: {message}
              </div> 
            ))
          }
        </div>
    )
};


const FormMessage = ({ currentChannelId }) => {
  const { t } = useTranslation();
  const refInput = useRef();
  const socket = useContext(socketContext);
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  const filter = require('leo-profanity');
  
  filter.clearList();
  filter.add(filter.loadDictionary('en'));
  filter.add(filter.loadDictionary('fr'));
  filter.add(filter.loadDictionary('ru'));
  console.log(filter);

  const handlerSubmit = ({ message }, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    const filteredMessage = filter.check(message) ? filter.clean(message) : message;
    console.log(filteredMessage);

    const newMessage =  { filteredMessage, channelId: currentChannelId, username };
    socket.emit('newMessage', newMessage, (response) => {

      if (response.status === 'ok') {
        setSubmitting(false);
        resetForm();
        refInput.current.focus();
        dispatch(fetchData());
      } else {
        toast.error(t('toast.connectError'));
      }

    });
  };

 /* useEffect(() => {
    dispatch(fetchMessages());
    refInput.current.focus();
  }, []);*/

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
            placeholder={t('elements.enterMessage')} 
            ref={refInput}
            readOnly={formik.isSubmitting}
          />
          <Button type="submit" disabled={formik.isSubmitting}>
            {t('elements.buttonSend')}
          </Button>
          {formik.errors.message
            && <Form.Control.Feedback type="invalid">{t(formik.errors.message)}</Form.Control.Feedback>}
        </InputGroup>
      </Form>
    </div>
  )
};


const Messages = () => {
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelId} = useSelector((state) => state.channels);

  const currentChannelName = channels.filter(({id}) => id === currentChannelId).map((channel) => channel.name);
  return (
  <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">{currentChannelName}</p>
        </div>
        <ChannelMessages currentChannelId={currentChannelId} />
        <FormMessage currentChannelId={currentChannelId} />
      </div>
  </Col>
  );
}

export default Messages;