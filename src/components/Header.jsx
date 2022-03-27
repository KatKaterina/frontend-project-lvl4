import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import schema from '../validateSchema.js';
import { authorizContext }  from '../contexts/index.js';
import axios from 'axios';
import routes from '../routes.js';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Exit = () => {
  const { t } = useTranslation();
  const authorization = useContext(authorizContext);
  const handleClick = () => {
    e.preventDefault();
    authorization.logOut();
    navigate('/');
  };
  console.log(authorization.loggedIn);
    return (
      authorization.loggedIn ? <Link to="/login" onClick={handleClick}>{t('elements.logOut')}</Link> : null
    );
}

const Header = () => {
    return (
      <Navbar className="shadow-sm bg-light">
        <Navbar.Brand as={Link} to="/login">Hexlet chat</Navbar.Brand>
        <Nav>
          <Exit />
        </Nav>
      </Navbar>
    );
}

export default Header;