import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import schema from '../validateSchema.js';
import { authorizContext }  from '../contexts/index.js';
import axios from 'axios';
import routes from '../routes.js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const SignUp = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const authorization = useContext(authorizContext);
  const navigate = useNavigate();
  
  const handlerSubmit = async ({ username, password }, { setSubmitting }) => {
    setSubmitting(true);
    const signUpPath = routes.signUpPath();
      try {
        const {data} =  await axios.post(signUpPath, { username, password });
        authorization.logIn(data);
        console.log(data);
        navigate('/');
      } catch (e) {
        if (e.isAxiosError && e.response && e.response.status === 409) {
          setError('userExists');
        } else {
          setError('networkError');
          toast.error(t('toast.connectError'));
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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlfor="username">{t('elements.name')}</Form.Label>
        <Form.Control
          name="username"
          type="text"
          id="username"
          autocomplite="username"
          required
          placeholder={t('elements.name')} 
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={Boolean(formik.errors.username)}
          readOnly={formik.isSubmitting}
        />
        {formik.errors.username
          && <Form.Control.Feedback type="invalid">{t(formik.errors.username)}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlfor="password">{t('elements.password')}</Form.Label>
        <Form.Control
          name="password"
          type="password"
          id="password"
          autocomplite="new-password"
          required
          placeholder={t('elements.password')}
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={Boolean(formik.errors.password)}
          readOnly={formik.isSubmitting}
        />
        {formik.errors.password
          && <Form.Control.Feedback type="invalid">{t(formik.errors.password)}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlfor="confirmPassword">{t('elements.confirmPassword')}</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            autocomplite="new-password"
            required
            placeholder={t('elements.confirmPassword')}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            isInvalid={Boolean(formik.errors.confirmPassword)}
            readOnly={formik.isSubmitting}
          />
            {formik.errors.confirmPassword
              && <Form.Control.Feedback type="invalid">{t(formik.errors.confirmPassword)}</Form.Control.Feedback>}
        </Form.Group>
      <Button variant="outline-primary" type="submit" disabled={formik.isSubmitting} className="w-100 mb-3">
        {t('elements.buttonRegistration')}
      </Button>
    </Form>
  );
};
  
export default SignUp;