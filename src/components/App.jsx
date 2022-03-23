import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Chat from './Chat.jsx';
import { authorizContext, socketContext }  from '../contexts/index.js';
import ModalAddChannel from './ModalAddChannel.jsx';

const AutorizProvider = ({children}) => {
  //console.log(authorizContext);
  const token = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(Boolean(token));
  const logIn = ({ username, token }) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    setLoggedIn(true); 
  };
  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLoggedIn(false);
  }
  //console.log(token);
  //console.log(loggedIn);
  return (
      <authorizContext.Provider value={{ loggedIn, logIn, logOut }}>
          {children}
      </authorizContext.Provider>
  )
}

const UserRoute = ({ children }) => {
  //console.log(children);
  const { loggedIn } = useContext(authorizContext);
  //console.log("logedIn " + loggedIn);

  return (
    loggedIn ? children : <Navigate to="/login"/>
  );
  
  /*return (
    <Route exact={exact} path={path}>
      {loggedIn ? children : <Navigate to="/login"/>}
    </Route>
  )*/
};

const renderModal = (type) => {
  console.log("type2: " + type);
  switch (type) {
    case 'addChannel': {
      return <ModalAddChannel />
    }
    default: {
      return null;
    }
  }
  //return null;
}

const App = ({ socket }) => {
  const { type } = useSelector((state) => state.modal);
  console.log('type: ' + type);
    return (
      <AutorizProvider>
        <socketContext.Provider value={socket}>
        <Router>
          <div className="d-flex flex-column h-100">
            <Routes>
              <Route exact path="/" element={<UserRoute><Chat /></UserRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
        {renderModal(type)}
        </socketContext.Provider>
      </AutorizProvider>
    );
};

export default App;
