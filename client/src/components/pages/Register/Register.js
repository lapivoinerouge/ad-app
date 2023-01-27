import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../common/PageTitle/PageTitle";
import { useState } from "react";
import { AUTH_URL } from "../../../config";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // loading, success, serverError, clientError, loginError

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('phoneNumber', phone);
    formData.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: formData
    }

    setStatus('loading');
    fetch(`${AUTH_URL}/register`, options)
      .then(async (res) => {
        if (res.status === 201) {
          setStatus('success');
          await new Promise(r => setTimeout(r, 1500)).then(() => navigate('/login'));
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if(res.status === 409) {
          setStatus('loginError');
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
      <PageTitle>Sign up</PageTitle>

      {status === 'success' && <Alert variant='success'>
        <Alert.Heading>Sucess</Alert.Heading>
        <p>You have been successfully registered</p>
      </Alert>}

      {status === 'serverError' && <Alert variant='danger'>
        <Alert.Heading>Something went wrong...</Alert.Heading>
        <p>Unexpected error, try again.</p>
      </Alert>}

      {status === 'clientError' && <Alert variant='danger'>
        <Alert.Heading>No enough data</Alert.Heading>
        <p>Fill all the fields and try again.</p>
      </Alert>}

      {status === 'loginError' && <Alert variant='warning'>
        <Alert.Heading>Username already in use</Alert.Heading>
        <p>You have to choose another username.</p>
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

      <Form.Group className='mb-3' controlId='formPhone'>
        <Form.Label>Phone number</Form.Label>
        <Form.Control value={phone} onChange={e => setPhone(e.target.value)} type='text' placeholder='Enter your phone number' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formFile'>
        <Form.Label>Avatar</Form.Label>
        <Form.Control type='file' onChange={e => setAvatar(e.target.files[0])} placeholder='Upload your avatar' />
      </Form.Group>

      <Button variant="primary" type='submit'>Submit</Button>
    </Form>
  );
};

  export default Register;