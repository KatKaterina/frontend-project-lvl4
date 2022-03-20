import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectorChannels, changeCurrentChannel } from '../slices/ChannelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector(selectorChannels.selectAll);

  const {currentChannelId} = useSelector((state) => state.channels);


  //console.log('channels:');
  //console.log(channels);
  //console.log(currentChannelId);

  /*useEffect(() => {
      dispatch(fetchData());
  }, [dispatch]);*/

  const handleAddChannel = () => {

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
        <Nav className="flex-column" activeKey={currentChannelId}>
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
  }

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