import React, { useEffect } from 'react';
import { Col, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllChannels } from '../slices/ChannelsSlice.js';
import routes from '../routes.js';
import axios from 'axios';

const Channels = () => {
  const dispatch = useDispatch();
  //const channels = useSelector(selectorChannels.selectAll);
  const channels = useSelector(selectAllChannels);

  //const {channels} = useSelector((state) => state.channels);
  const {currentChannelId} = useSelector((state) => state.channels);
  

  //console.log(localStorage.getItem('token'));

  /*const getAuthorizationHeader = () => {
    const token = localStorage.getItem('token');
    console.log('token:');
    console.log(token);
    console.log(routes.dataPath());
    //return token ? { Authorization: `Bearer ${token}` } : {}
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };
  
  const fetchData = 
      async () => {
        const {data} = await axios.get(routes.dataPath(), { headers: getAuthorizationHeader() });
        console.log(data);
        return data;
      };

  fetchData();*/



  console.log('channels:');
  console.log(channels);
  console.log(currentChannelId);

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
                buttonVariant={id === currentChannelId ? 'primary': 'light'}
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