import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import schema from '../validateSchema.js';
import authorizContext  from '../contexts/index.js';
import axios from 'axios';
import routes from '../routes.js';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState(null);
  const authorization = useContext(authorizContext);

  //console.log(authorizContext);
  //console.log(authorization);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const pathLogin = routes.loginPath();
    setError(null);
    console.log(pathLogin);
    try {
        //const { username, password } = values;
        const { data } =  await axios.get(pathLogin, {...values});
        authorization.logIn(data);
        console.log(data);
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
    validationSchema: schema,
    onSubmit: handleSubmit
  });
  console.log(formik);


  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlfor="username">User name</Form.Label>
        <Form.Control
          name="username"
          type="text"
          id="username"
          autocomplite="username"
          required
          placeholder="Enter user name" 
          onChange={formik.handleChange}
          value={formik.values.username}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlfor="password">Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          id="password"
          autocomplite="current-password"
          required
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Group>
    <Button variant="outline-primary" type="submit" className="w-100 mb-3">
      Submit
    </Button>
  </Form>
  )
}

export default Login;
