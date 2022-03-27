import React, { useState, useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import schema from '../validateSchema.js';
import { authorizContext }  from '../contexts/index.js';
import axios from 'axios';
import routes from '../routes.js';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const authorization = useContext(authorizContext);

  //console.log(authorizContext);
  //console.log(authorization);

  const location = useLocation();
  const navigate = useNavigate();

  const refInput = useRef();

  useEffect(() => {
    refInput.current.focus();
  }, []);

  const handlerSubmit = async ({ username, password }) => {
    const pathLogin = routes.loginPath();
    setError(null);
    //console.log("pathLogin " + pathLogin);
    try {
        //const { username, password } = values;
        const {data} =  await axios.post(pathLogin, { username, password });
        authorization.logIn(data);
        //console.log(data);
        navigate('/');
    } catch (e) {
        if (e.isAxiosError && e.response && e.response.status === 401) {
          setError('accessDenial');
          console.log('accessDenial');
        } else {
            setError('networkError');
            console.log('networkError');
        }
    }
  };
    
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    /*validationSchema: schema,*/
    onSubmit: handlerSubmit,
  });
 // console.log(formik.handleSubmit);
 // console.log(handlerSubmit);
  const { values, handleSubmit, handleChange } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlfor="username">{t('elements.name')}</Form.Label>
        <Form.Control
          name="username"
          type="text"
          id="username"
          autocomplite="username"
          required
          placeholder={t('elements.name')} 
          onChange={handleChange}
          value={values.username}
          isInvalid={Boolean(error)}
          ref={refInput}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlfor="password">{t('elements.password')}</Form.Label>
        <Form.Control
          name="password"
          type="password"
          id="password"
          autocomplite="current-password"
          required
          placeholder={t('elements.password')}
          onChange={handleChange}
          value={values.password}
          isInvalid={Boolean(error)}
        />
        {error&&<Form.Control.Feedback type="invalid">{t(`errors.${error}`)}</Form.Control.Feedback>}
      </Form.Group>
    <Button variant="outline-primary" type="submit" className="w-100 mb-3">
      {t('elements.signIn')}
    </Button>
    <div className="text-center">
     <span>
      <Link to="/signup">{t('elements.registration')}</Link>
     </span>
    </div>
  </Form>
  
  )
}

export default Login;
