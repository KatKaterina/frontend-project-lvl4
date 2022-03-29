import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { authorizContext }  from '../contexts/index.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { fetchData } from '../slices/ChannelsSlice.js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Chat = () => {
  const { t } = useTranslation();
  const authorization = useContext(authorizContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData())
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
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
   </>
 );
}

export default Chat;

/*<div className="text-center">
<span>
  <Link to="/login" onClick={handleClick}>{t('elements.logOut')}</Link>
</span>
</div>*/
