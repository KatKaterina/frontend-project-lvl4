import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import authorizContext  from '../contexts/index.js';
import Channels from './Channels.jsx';
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
   <Row className="flex-grow flex-column h-70">
     <Channels />
   </Row>
   <div className="text-center">
     <h1>здесь чат!</h1>
     <span>
      <Link to="/login" onClick={handleClick}>LogOut</Link>
     </span>
    </div>
  </>
);
}

export default Chat;
