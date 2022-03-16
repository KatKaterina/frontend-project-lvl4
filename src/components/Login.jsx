import React from 'react';
import { Formik, Field, useFormik, useField, useFormikContext } from 'formik';
import { Form, Button } from 'react-bootstrap';
import schema from '../validateSchema.js';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log("login");
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
          value={formik.values.userName}
        />
      </Form.Group>

    <Button variant="outline-primary" type="submit" className="w-100 mb-3">
      Submit
    </Button>
  </Form>
  )
}

export default Login;
