import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels } from '../slices/ChannelsSlice.js';

const ChannelMessages = () => {

    return (
        <div className="chat-messages overflow-auto px-5">
            <div className="text-break mb-2">
              <b>Name</b>
              ": "
              "message"
            </div>
        </div>
    )
};

const FormMessage = () => {
  const handleSubmit = () => {

  }

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    /*validationSchema: schema,*/
    onSubmit: handleSubmit,
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control 
            name="body" 
            aria-label="body"
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          <InputGroup.Append>
            <Button type="submit">
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  )
};

/*const MessageHeader = () => {

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">{currentChannelName}</p>
    </div>
    <Message/>
  )
}*/

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
        <ChannelMessages />
        <FormMessage />
      </div>
  </Col>
  );
}

export default Messages;