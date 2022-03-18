import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import authorizContext  from '../contexts/index.js';

const Chat = () => {
  const authorization = useContext(authorizContext);
  return (
  <div className="text-center">
    <h1>здесь чат!</h1>
    <span>
      <Link onClick={authorization.logOut}>LogOut</Link>
    </span>
  </div>
);
}

export default Chat;
