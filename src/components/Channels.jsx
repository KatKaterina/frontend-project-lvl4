import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels, changeCurrentChannel } from '../slices/ChannelsSlice.js';

const fixedChannel = ({ name, buttonVariant, onClick }) => (
  <Nav.Link as={Button} variant={buttonVariant} block className="w-100 rounded-0 text-start" onClick={onClick}>
      {name}
    </Nav.Link>
  );
  //className="mb-2 text-left"

const Channels = () => {
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelId} = useSelector((state) => state.channels);

  const dispatch = useDispatch();

  //const getButtonVariant = (id) => (id === currentChannelId ? 'primary' : 'light');
  
  const handleClick = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
    //console.log(currentChannelId);
  };

  const handleAdd = () => {
    
  };

  const handleRemove = (id) => () => {
  
  };

  const handleRename = (id, name) => () => {
   
  };

  const renderChannels = () => (
    <Nav variant="pills" fill className="flex-column">
      {channels.map(({ id, name, removable }) => {
        const Channel = removable ? fixedChannel : fixedChannel;
        return (
          <Nav.Item key={id}>
            <Channel
              name={name}
              buttonVariant={id === currentChannelId ? 'warning' : 'light'}
              onClick={handleClick(id)}
              onRemove={handleRemove(id)}
              onRename={handleRename(id, name)}
            />
          </Nav.Item>
        );
      })}
    </Nav>
  );
    return (
     
        <Col className="border-end pt-5 px-0 bg-light">
          <div className="d-flex mb-2 ps-4 pe-2 justify-content-between">
            <span>Channels</span>
            <Button variant="link" className="p-0 ml-auto" onClick={handleAdd}>+</Button>
          </div>
          {renderChannels()}
        </Col>
    
    )
};

export default Channels;