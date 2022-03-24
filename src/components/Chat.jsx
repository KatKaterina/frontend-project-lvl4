import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { authorizContext }  from '../contexts/index.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { fetchData, selectorChannels } from '../slices/ChannelsSlice.js';
import { selectorMessages } from '../slices/messagesSlice';
import { useDispatch, useSelector } from 'react-redux';

const Chat = () => {
  const authorization = useContext(authorizContext);
  const dispatch = useDispatch();
  const [uploaded, setUploaded] = useState(false);
  
  //const channels =  useSelector(selectorChannels.selectAll);
  //const messages = useSelector(selectorMessages.selectAll);
  const channels = useSelector((state) => state.channels);
  console.log(channels);
  //console.log(messages);

  useEffect(() => {
      dispatch(fetchData())
      //setUploaded(true);
  }, [channels]);
  //[channels, messages]

  const handleClick = (e) => {
    e.preventDefault();
    //console.log('1');
    authorization.logOut();
  }
  return (
  <>
    <div className = "container h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
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
//<Row className="flex-grow-1 h-70 pb-3"></Row>
export default Chat;
