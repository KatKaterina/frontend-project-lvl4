import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { authorizContext }  from '../contexts/index.js';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Exit = () => {
  const { t } = useTranslation();
  const authorization = useContext(authorizContext);
  const handleClick = () => {
    e.preventDefault();
    authorization.logOut();
    navigate('/');
  };
  return (
    authorization.loggedIn ? <Link to="/login" onClick={handleClick}>{t('elements.logOut')}</Link> : null
  );
};

const Header = () => {
  return (
    <Navbar className="shadow-sm bg-light">
      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      <Nav>
        <Exit />
      </Nav>
    </Navbar>
  );
};

export default Header;