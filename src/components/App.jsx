import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import authorizContext  from '../contexts/index.js';

const AutorizProvider = ({children}) => {
  console.log(authorizContext);
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
  console.log(token);
  console.log(loggedIn);
  return (
      <authorizContext.Provider value={{ loggedIn, logIn, logOut }}>
          {children}
      </authorizContext.Provider>
  )
}

const UserRoute = ({ exact, path, children }) => {
  console.log(children);
  const { loggedIn } = useContext(authorizContext);
  console.log(loggedIn);
  
  return (
    <Route exact={exact} path={path}>
      {loggedIn ? children : <Navigate to="/login"/>}
    </Route>
  )
};

const App = () => {
    return (
      <AutorizProvider>
        <Router>
          <div className="d-flex flex-column h-100">
            <Routes>
              <Route exact path="/" element={<UserRoute exact path="/"><NotFound /></UserRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AutorizProvider>
    );
};

export default App;
