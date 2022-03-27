import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import schema from '../validateSchema.js';
import { authorizContext }  from '../contexts/index.js';
import axios from 'axios';
import routes from '../routes.js';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [error, setError] = useState(null);
    const authorization = useContext(authorizContext);
  
    const location = useLocation();
    const navigate = useNavigate();
  
    const handlerSubmit = async ({ username, password }, { setSubmitting }) => {
        setSubmitting(true);
        const signUpPath = routes.signUpPath();
        //setError(null);
      //console.log("pathLogin " + pathLogin);
      try {
          //const { username, password } = values;
          const {data} =  await axios.post(signUpPath, { username, password });
          authorization.logIn(data);
          //console.log(data);
          navigate('/');
      } catch (e) {
          if (e.isAxiosError && e.response && e.response.status === 409) {
            setError('userExists');
            console.log('userExists');
          } else {
              setError('networkError');
              console.log('networkError');
          }

          setSubmitting(false);
      }
    };
      
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: schema,
      onSubmit: handlerSubmit,
    });
   // console.log(formik.handleSubmit);
   // console.log(handlerSubmit);
  
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
            isInvalid={Boolean(error)}
            readOnly={formik.isSubmitting}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlfor="password">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            id="password"
            autocomplite="new-password"
            required
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={Boolean(error)}
            readOnly={formik.isSubmitting}
          />
          {error&&<Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlfor="confirmPassword">Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            autocomplite="new-password"
            required
            placeholder="confirm password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={Boolean(error)}
            readOnly={formik.isSubmitting}
          />
          {error&&<Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>}
        </Form.Group>
      <Button variant="outline-primary" type="submit" disabled={formik.isSubmitting} className="w-100 mb-3">
        Submit
      </Button>
    </Form>
    )
  }
  
  export default SignUp;