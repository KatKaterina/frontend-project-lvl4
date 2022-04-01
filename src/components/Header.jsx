import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav } from 'react-bootstrap';
import { authorizContext } from '../contexts/index.js';

const Exit = () => {
  const { t } = useTranslation();
  const authorization = useContext(authorizContext);

  const handleClick = () => {
    authorization.logOut();
  };

  return (
    authorization.loggedIn ? <Link to="/login" onClick={handleClick}>{t('elements.logOut')}</Link> : null
  );
};

const Lang = () => {
  const { i18n } = useTranslation();
  const changeLang = (lng) => () => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Nav.Link onClick={changeLang('ru')}>Рус</Nav.Link>
      {' '}
      <Nav.Link onClick={changeLang('en')}>Eng</Nav.Link>
    </>
  );
};

const Header = () => (
  <Navbar className="shadow-sm bg-light d-flex justify-content-between">
    <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
    <Nav>
      <Exit />
    </Nav>
    <Nav className="mr-auto">
      <Lang />
    </Nav>
  </Navbar>
);

export default Header;
