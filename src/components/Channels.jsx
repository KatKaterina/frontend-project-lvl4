import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels, changeCurrentChannel } from '../slices/ChannelsSlice.js';

/*const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector(selectorChannels.selectAll);

  const {currentChannelId} = useSelector((state) => state.channels);


  //console.log('channels:');
  //console.log(channels);
  //console.log(currentChannelId);

  /*useEffect(() => {
      dispatch(fetchData());
  }, [dispatch]);*/

 /* const handleAddChannel = () => {

  };

  const handleClick = (id) => (e) => {
    e.preventDefault();
     dispatch(changeCurrentChannel({ id }));
     console.log(currentChannelId);
  };

  const handleRemove = (id) => {

  };

  const handleRename = (id, name) => {

  };


  const channelFixed = ({ id, name, onClick}) => {
      return (
        <Nav.Link key={id} className="w-100 rounded-0 text-start btn btn-success" onClick={onClick}>
          {name}
        </Nav.Link>
      );
  }

  //buttonVariant={id === currentChannelId ? 'outline-success': 'light'}
  const renderChannels = () => {
      return (
        <Nav variant="pills" className="flex-column" >
          {channels.map(({ id, name, removable }) => {
          const Channel = removable ? channelFixed : channelFixed;
          return (
          
              <Channel
                key={id}
                name={name}
                onClick={handleClick(id)}
                onRemove={handleRemove(id)}
                onRename={handleRename(id, name)}
              />
      
          );
        })}
        </Nav>
      );
  }*/
  const IrremovableChannel = ({ name, buttonVariant, onClick }) => (
    <Nav.Link
      as={Button}
      variant={buttonVariant}
      block
      className="mb-2 text-left"
      onClick={onClick}
    >
      {name}
    </Nav.Link>
  );


  const Channels = () => {
    const channels = useSelector(selectorChannels.selectAll);

    const {currentChannelId} = useSelector((state) => state.channels);

  const dispatch = useDispatch();


  const getButtonVariant = (id) => (id === currentChannelId ? 'primary' : 'light');

  const handleAddChannel = () => {
    
  };

  const handleRemoveChannel = (id) => () => {
  
  };

  const handleRenameChannel = (id, name) => () => {
   
  };

  const handleClickChannel = (id) => () => {
    //dispatch(setCurrentChannelId({ id }));
    dispatch(changeCurrentChannel({ id }));
  };

  const renderChannels = () => (
    <Nav variant="pills" fill className="flex-column">
      {channels.map(({ id, name, removable }) => {
        const Channel = removable ? IrremovableChannel : IrremovableChannel;
        return (
          <Nav.Item key={id}>
            <Channel
              name={name}
              buttonVariant={getButtonVariant(id)}
              onClick={handleClickChannel(id)}
              onRemove={handleRemoveChannel(id)}
              onRename={handleRenameChannel(id, name)}
            />
          </Nav.Item>
        );
      })}
    </Nav>
  );
    return (
     
        <Col className="border-right">
          <div className="d-flex mb-2">
            <span>Channels</span>
            <Button variant="link" className="ml-auto p-0" onClick={handleAddChannel}>+</Button>
          </div>
          {renderChannels()}
        </Col>
    
    )
};

export default Channels;