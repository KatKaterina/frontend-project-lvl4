import { useFormik } from 'formik';
import React, { useEffect, useContext, useRef } from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels } from '../slices/ChannelsSlice.js';
import { socketContext }  from '../contexts/index.js';
import { selectorMessages } from '../slices/messagesSlice.js';
import { fetchData } from '../slices/ChannelsSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { schemaForMessage } from '../validateSchema.js';

const filter = require('leo-profanity');
filter.clearList();
filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));


const ChannelMessages = ({ currentChannelId }) => {

  const messages = useSelector(selectorMessages.selectAll);
  const refChat = useRef();
  
  useEffect(()=> {
    refChat.current.scrollTop = refChat.current.scrollHeight
  }, [messages]);
  
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={refChat}>
      {messages.filter(({ channelId }) => Number(channelId) === currentChannelId)
        .map(({ username, message, id }) => {
          const filteredMessage = filter.check(message) ? filter.clean(message, '*') : message.trim();
          return (
          <div key={id} className="text-break mb-2">
            <p>
              <strong>{`${username}: `}</strong>
              {filteredMessage}
            </p>
          </div> 
        )})
      }
    </div>
  );
};
//b>{username}</b>: {filteredMessage}

const FormMessage = ({ currentChannelId, t }) => {
  const refInput = useRef();
  const socket = useContext(socketContext);
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();

  /*const filter = require('leo-profanity');
  
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));*/

  const handlerSubmit =  async ({ message }, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    /* if (message.trim() === 'your have nice boobs') {
      message = 'you have nice boobs';
    };*/
    const filteredMessage = filter.check(message) ? filter.clean(message, '*') : message.trim();
    const newMessage =  { message: filteredMessage, channelId: currentChannelId, username };
    //const newMessage =  { message, channelId: currentChannelId, username };
    await socket.emit('newMessage', newMessage, (response) => {
      if (response.status === 'ok') {
        dispatch(fetchData());
        setSubmitting(false);
        resetForm();
        refInput.current.focus();
      } else {
        toast.error(t('toast.connectError'));
      }
    });
  };

  useEffect(() => {
    refInput.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: schemaForMessage,
    onSubmit: handlerSubmit,
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate onSubmit={formik.handleSubmit} className="py-1">
        <InputGroup className="mb-3 has-validation">
          <Form.Control 
            name="message"
            id="message"
            type="text"
            aria-label={t('elements.message')}
            data-testid="new-message"
            className="p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.message}
            placeholder={t('elements.enterMessage')} 
            ref={refInput}
            readOnly={formik.isSubmitting}
          />
          <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
            {t('elements.buttonSend')}
          </Button>
          {formik.errors.message
            && <Form.Control.Feedback type="invalid">{t(formik.errors.message)}</Form.Control.Feedback>}
        </InputGroup>
      </Form>
    </div>
  );
};

const Messages = () => {
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelId} = useSelector((state) => state.channels);
  const { t } = useTranslation();

  const currentChannelName = channels.filter(({id}) => id === currentChannelId).map((channel) => channel.name);
  return (
    <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">{currentChannelName}</p>

        </div>
        <ChannelMessages currentChannelId={currentChannelId} />
        <FormMessage currentChannelId={currentChannelId} t={t} />
      </div>
    </Col>
  );
};

//<span>{t('elements.hello')}</span>
//<span>you have nice \*\*\*\*\*</span>

export default Messages;