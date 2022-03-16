import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

const App = () => {
    console.log("!!!");
    return (
        <Router>
          <div className="d-flex flex-column h-100">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
    );
};

export default App;
