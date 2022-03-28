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
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';
import SignUp from './SignUp.jsx';
import Header from './Header.jsx';
//import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider as ProviderRollbar, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';

const AutorizProvider = ({ children }) => {
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
  };

  return (
    <authorizContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authorizContext.Provider>
  );
}

const UserRoute = ({ children }) => {
  const { loggedIn } = useContext(authorizContext);

  return (
    loggedIn ? children : <Navigate to="/login"/>
  );
};

const renderModal = (type) => {
  switch (type) {
    case 'addChannel': {
      return <ModalAddChannel />
    }
    case 'renameChannel': {
      return <ModalRenameChannel />
    }
    case 'removeChannel': {
      return <ModalRemoveChannel />
    }
    default: {
      return null;
    }
  };
};

const App = ({ socket }) => {
  const { type } = useSelector((state) => state.modal);
   const rollbarConfig = {
    accessToken: '0c63dc2b0eb345e1b54abaa5c326902e',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  // <ProviderRollbar config={rollbarConfig}>
  // <ErrorBoundary level={LEVEL_WARN}>
  // console.log('type: ' + type);
    return (

      <AutorizProvider>
        <socketContext.Provider value={socket}>
        <Router>
          <div className="d-flex flex-column h-100">
          <ToastContainer />
            <Header />
            <Routes>
              <Route exact path="/" element={<UserRoute><Chat /></UserRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
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
