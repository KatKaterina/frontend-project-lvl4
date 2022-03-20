import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import authorizContext  from '../contexts/index.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { fetchData } from '../slices/ChannelsSlice.js';
import { useDispatch } from 'react-redux';

const Chat = () => {
  const authorization = useContext(authorizContext);
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(fetchData());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    //console.log('1');
    authorization.logOut();
  }
  return (
  <>
   <div className = "container h-100 my-4 overflow-hidden rounded shadow">
   <Row className="flex-grow-1 h-70 pb-3">
     <Channels />
     <Messages />
   </Row>
   </div>
   <div className="text-center">
     <span>
      <Link to="/login" onClick={handleClick}>LogOut</Link>
     </span>
    </div>
  </>
);
}

export default Chat;
