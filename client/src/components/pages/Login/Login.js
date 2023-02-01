import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import PageTitle from "../../common/PageTitle/PageTitle";
import { useState } from "react";
import { AUTH_URL } from "../../../config";
import { useDispatch } from 'react-redux';
import { fetchUserRequest } from "../../../redux/userRedux";
import styles from "./Login.module.scss";
import clsx from "clsx";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // loading, success, serverError, clientError, loginError

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    }

    setStatus('loading');
    fetch(`${AUTH_URL}/login`, options)
      .then(async (res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(fetchUserRequest());
          await new Promise(r => setTimeout(r, 1500)).then(() => navigate('/'));
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      })
  }

  return (
    <section className={styles.loginSection}>
      <PageTitle>Sign in</PageTitle>
      <Card className={styles.loginCard}>
        <Form className={clsx('col-12 col-sm-8', styles.form)} onSubmit={handleSubmit}>

          {status === 'success' && <Alert variant='success' className={styles.alert}>
            <Alert.Heading>Sucess!</Alert.Heading>
            <p>You have been successfully logged in.</p>
          </Alert>}

          {status === 'serverError' && <Alert variant='danger' className={styles.alert}>
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error, try again.</p>
          </Alert>}

          {status === 'clientError' && <Alert variant='danger' className={styles.alert}>
            <Alert.Heading>Incorrect data</Alert.Heading>
            <p>Username or password is incorrect.</p>
          </Alert>}

          {status === 'loading' && <Spinner className={styles.spinner} animation='border' role='status'>
            <span className='visually-hidden'></span>
          </Spinner>}

          <Form.Group className='mb-4' controlId='formUsername'>
            <Form.Control className={styles.loginInput} value={username} onChange={e => setUsername(e.target.value)} type='text' autoComplete='username' placeholder='username' />
          </Form.Group>

          <Form.Group className='mb-4' controlId='formPassword'>
            <Form.Control className={styles.loginInput} value={password} onChange={e => setPassword(e.target.value)} type='password' autoComplete='current-password' placeholder='password' />
          </Form.Group>

          <Button className={styles.button} variant="primary" type='submit'>Submit</Button>
          <p className={styles.signUp}>Don't have an account? <NavLink to='/register'>Sign up and get started!</NavLink></p>
        </Form>
      </Card>
    </section>
  );
};

  export default Login;