import React, { useEffect, useState } from 'react';
import { Col, Nav, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels, changeCurrentChannel, fetchData } from '../slices/ChannelsSlice.js';
import { openModal, closeModal } from '../slices/modalSlice.js';
//as={Button} variant={buttonVariant} block
const fixedChannel = ({ name, onClick, id, active }) => (
  <Nav.Link key={id}  eventKey={id} active={active}  className="w-100 rounded text-start" onClick={onClick}>
      {name}
    </Nav.Link>
  );
  //className="mb-2 text-left"

 const unremovableChannel = ({ name, variant, onClick, onRename, onRemove, id, active }) => (
  <Dropdown as={ButtonGroup} className="d-flex mb-2">
    <Nav.Link key={id}  eventKey={id} active={active} className="w-100 rounded text-start" onClick={onClick}>
      {name}
    </Nav.Link>

    <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" />

    <Dropdown.Menu>
      <Dropdown.Item onClick={onRename}>Rename channel</Dropdown.Item>
      <Dropdown.Item onClick={onRemove}>Remove channel</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
 );

const Channels = () => {
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelId} = useSelector((state) => state.channels);
  const [updateChannels, setUpdateChannels] = useState(false);
  //console.log('updateChannels/ первый');
  //console.log(updateChannels);

  const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(fetchData());
    //setUpdateChannels(false);
    //refInput.current.focus();
  }, [updateChannels]);*/


  //const getButtonVariant = (id) => (id === currentChannelId ? 'primary' : 'light');
  
  const handleClick = (id) => () => {
    //setUpdateChannels(true);
    dispatch(changeCurrentChannel({ id }));
    dispatch(fetchData());
  
  };

  const handleAdd = (e) => {
    e.preventDefault();
    //setUpdateChannels(true);
    dispatch(openModal({ type: 'addChannel', updateData: null }));
    //setUpdateChannels(true);
    //console.log(updateChannels);
  };

  const handleRemove = (id) => () => {
    //console.log('updateChannels/удалкние1');
    //console.log(updateChannels);
    //setUpdateChannels(true);
    dispatch(openModal({ type: 'removeChannel', updateData: { id } }));
    //setUpdateChannels(false);
    //console.log('updateChannels/удаление2');
    //console.log(updateChannels);
    //setUpdateChannels(true);
    //dispatch(fetchData());
  };

  const handleRename = (id, name) => () => {
    //setUpdateChannels(true);
    dispatch(openModal({ type: 'renameChannel', updateData: { id, name } }));
    //setUpdateChannels(true);
    //console.log(updateChannels);
  };

  //const Channel = removable ? unremovableChannel : fixedChannel;
  //buttonVariant={id === currentChannelId ? 'primary' : null}

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
              variant={id === currentChannelId ? 'primary' : null}
              active={id === currentChannelId ? "true" : ""}
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