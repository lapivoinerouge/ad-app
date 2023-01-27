import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../common/PageTitle/PageTitle";
import { useState } from "react";
import { AUTH_URL } from "../../../config";
import { useDispatch } from 'react-redux';
import { logIn } from "../../../redux/userRedux";

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
      body: JSON.stringify({ username, password })
    }

    setStatus('loading');
    fetch(`${AUTH_URL}/login`, options)
      .then(async (res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({ username }));
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
    <Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
      <PageTitle>Sign in</PageTitle>

      {status === 'success' && <Alert variant='success'>
        <Alert.Heading>Sucess</Alert.Heading>
        <p>You have been successfully logged in</p>
      </Alert>}

      {status === 'serverError' && <Alert variant='danger'>
        <Alert.Heading>Something went wrong...</Alert.Heading>
        <p>Unexpected error, try again.</p>
      </Alert>}

      {status === 'clientError' && <Alert variant='danger'>
        <Alert.Heading>Incorrect data</Alert.Heading>
        <p>Username or password is incorrect</p>
      </Alert>}

      {status === 'loading' && <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>}

      <Form.Group className='mb-3' controlId='formUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control value={username} onChange={e => setUsername(e.target.value)} type='text' placeholder='Enter your username' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter your password' />
      </Form.Group>

      <Button variant="primary" type='submit'>Submit</Button>
    </Form>
  );
};

  export default Login;