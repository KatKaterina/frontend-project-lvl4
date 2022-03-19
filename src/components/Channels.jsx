import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsActions, fetchData, selectorChannels } from '../slices/ChannelsSlice.js';

const Channels = () => {
  const channels = useSelector(selectorChannels.selectAll);
  const {currentChannelsId} = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  console.log(channels);
  console.log(currentChannelsId);

  /*useEffect(() => {
      dispatch(fetchData());
  }, [dispatch]);*/

  const handleAddChannel = () => {

  };

  const handleClick = (id) => {
    /* dispatch(channelsActions.changeCurrentChannel({ id })); */
  };

  const handleRemove = (id) => {

  };

  const handleRename = (id, name) => {

  };


  const channelFixed = ({ name, buttonVariant, onClick}) => {
      return (
        <Nav.Link as={Button} variant={buttonVariant} block className="mb-2 text-left" onClick={onClick}>
          {name}
        </Nav.Link>
      );
  }

  const renderChannels = () => {
      return (
        <Nav variant="pills" fill className="flex-column">
          {channels.map(({ id, name, removable }) => {
          const Channel = removable ? channelFixed : channelFixed;
          return (
            <Nav.Item key={id}>
              <Channel
                name={name}
                buttonVariant={id === currentChannelsId ? 'primary': 'light'}
                onClick={handleClick(id)}
                onRemove={handleRemove(id)}
                onRename={handleRename(id, name)}
              />
            </Nav.Item>
          );
        })}
        </Nav>
      );
  }

    return (
      <div className = "container h-100 my-4 overflow-hidden rounded shadow">
        <Col className="border-right">
          <div className="d-flex mb-2">
            <span>Channels</span>
            <Button variant="link" className="ml-auto p-0 btn-group-vertical" onClick={handleAddChannel}>+</Button>
          </div>
          {renderChannels()}
        </Col>
      </div>
    )
};

export default Channels;