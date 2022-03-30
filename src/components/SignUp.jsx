import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, {
  useContext, useEffect, useRef,
} from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import schema from '../validateSchema.js';
import { authorizContext } from '../contexts/index.js';
import routes from '../routes.js';

const SignUp = () => {
  const { t } = useTranslation();
  const authorization = useContext(authorizContext);
  const navigate = useNavigate();
  const refInput = useRef();

  useEffect(() => {
    refInput.current.focus();
  }, []);

  const handlerSubmit = async ({ username, password }, { setSubmitting }) => {
    setSubmitting(true);
    const signUpPath = routes.signUpPath();
    try {
      const { data } = await axios.post(signUpPath, { username, password });
      authorization.logIn(data);
      navigate('/');
    } catch (e) {
      if (e.isAxiosError && e.response && e.response.status === 409) {
        toast.error(t('toast.accessDenial'));
      } else {
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
        <Form.Label htmlFor="username">{t('elements.nameRegistration')}</Form.Label>
        <Form.Control
          name="username"
          type="text"
          id="username"
          autocomplite="username"
          required
          placeholder={t('elements.nameRegistration')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={Boolean(formik.errors.username)}
          readOnly={formik.isSubmitting}
          ref={refInput}
        />
        {formik.errors.username
          && <Form.Control.Feedback type="invalid">{t(formik.errors.username)}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">{t('elements.password')}</Form.Label>
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
        <Form.Label htmlFor="confirmPassword">{t('elements.confirmPassword')}</Form.Label>
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
