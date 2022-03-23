import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels, changeCurrentChannel } from '../slices/ChannelsSlice.js';
//as={Button} variant={buttonVariant} block
const fixedChannel = ({ name, buttonVariant, onClick }) => (
  <Nav.Link variant={buttonVariant}  className="w-100 rounded text-start btn btn-secondary" onClick={onClick}>
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
    <div className="border-end pt-5 px-0 bg-light">
    <Nav variant="pills" fill className="flex-column">
      {channels.map(({ id, name, removable }) => {
        const Channel = removable ? fixedChannel : fixedChannel;
        return (
          <Nav.Item key={id}>
            <Channel
              name={name}
              buttonVariant={id === currentChannelId ? 'warning' : null}
              onClick={handleClick(id)}
              onRemove={handleRemove(id)}
              onRename={handleRename(id, name)}
            />
          </Nav.Item>
        );
      })}
    </Nav>
    </div>
  );
    return (
     
        <Col className="border-end pt-5 px-0 bg-light h-100 w-25">
          <div className="d-flex mb-2 ps-4 pe-2 justify-content-between">
            <span>Channels</span>
            <Button variant="link" className="p-0 ml-auto" onClick={handleAdd}>+</Button>
          </div>
          {renderChannels()}
        </Col>
    
    )
};

export default Channels;