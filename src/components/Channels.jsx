import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels, changeCurrentChannel } from '../slices/ChannelsSlice.js';
import { openModal, closeModal } from '../slices/modalSlice.js';
//as={Button} variant={buttonVariant} block
const fixedChannel = ({ name, buttonVariant, onClick, id }) => (
  <Nav.Link key={id}  eventKey={id}  as="button" variant={buttonVariant}  className="w-100 rounded text-start" onClick={onClick}>
      {name}
    </Nav.Link>
  );
  //className="mb-2 text-left"

  const unremovableChannel = ({ name, buttonVariant, onClick, id }) => {

  }

const Channels = () => {
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelId} = useSelector((state) => state.channels);

  const dispatch = useDispatch();

  //const getButtonVariant = (id) => (id === currentChannelId ? 'primary' : 'light');
  
  const handleClick = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
    //console.log(currentChannelId);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(openModal({ type: 'addChannel'}));
  };

  const handleRemove = (id) => () => {
  
  };

  const handleRename = (id, name) => () => {
   
  };

  const renderChannels = () => (
    //<div className="border-end pt-5 px-0 bg-light">
    <Nav variant="pills" fill className="flex-column">
      {channels.map(({ id, name, removable }) => {
        const Channel = removable ? unremovableChannel : fixedChannel;
        return (
          //<Nav.Item key={id}  eventKey={id}>
            <Channel
              id={id}
              name={name}
              buttonVariant={id === currentChannelId ? 'primary' : null}
              onClick={handleClick(id)}
              onRemove={handleRemove(id)}
              onRename={handleRename(id, name)}
            />
          //</Nav.Item>
        );
      })}
    </Nav>
    //</div>
  );
    return (
     
        <Col md="auto" className="border-end pt-5 px-0 bg-light h-100">
          <div className="d-flex justify-content-around">
            <span>Channels: </span>
            <Button variant="outline-primary"  size="sm" className="p-0 ml-auto" onClick={handleAdd}>+</Button>
          </div>
          {renderChannels()}
        </Col>
    
    )
};

export default Channels;