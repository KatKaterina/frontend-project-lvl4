import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import schema from '../validateSchema.js';
import { authorizContext }  from '../contexts/index.js';
import axios from 'axios';
import routes from '../routes.js';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState(null);
  const authorization = useContext(authorizContext);

  //console.log(authorizContext);
  //console.log(authorization);

  const location = useLocation();
  const navigate = useNavigate();

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
        <Form.Label htmlfor="username">User name</Form.Label>
        <Form.Control
          name="username"
          type="text"
          id="username"
          autocomplite="username"
          required
          placeholder="Enter user name" 
          onChange={handleChange}
          value={values.username}
          isInvalid={Boolean(error)}
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
          onChange={handleChange}
          value={values.password}
          isInvalid={Boolean(error)}
        />
        {error&&<Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>}
      </Form.Group>
    <Button variant="outline-primary" type="submit" className="w-100 mb-3">
      Submit
    </Button>
    <div className="text-center">
     <span>
      <Link to="/signup">Sign Up</Link>
     </span>
    </div>
  </Form>
  
  )
}

export default Login;
