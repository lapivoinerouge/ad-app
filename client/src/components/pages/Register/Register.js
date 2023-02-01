import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../common/PageTitle/PageTitle";
import { useState } from "react";
import { AUTH_URL } from "../../../config";
import clsx from "clsx";
import styles from "./Register.module.scss";

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
    <section className={styles.registerSection}>
      <PageTitle>Sign up</PageTitle>
      <Card className={styles.registerCard}>
        <Form className={clsx('col-12 col-sm-8', styles.form)} onSubmit={handleSubmit}>
          {status === 'success' && <Alert variant='success' className={styles.alert}>
            <Alert.Heading>Sucess</Alert.Heading>
            <p>You have been successfully registered</p>
          </Alert>}

          {status === 'serverError' && <Alert variant='danger' className={styles.alert}>
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error, try again.</p>
          </Alert>}

          {status === 'clientError' && <Alert variant='danger' className={styles.alert}>
            <Alert.Heading>No enough data</Alert.Heading>
            <p>Fill all the fields and try again.</p>
          </Alert>}

          {status === 'loginError' && <Alert variant='warning' className={styles.alert}>
            <Alert.Heading>Username already in use</Alert.Heading>
            <p>You have to choose another username.</p>
          </Alert>}

          {status === 'loading' && <Spinner className={styles.spinner} animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>}

          <Form.Group className='mb-3' controlId='formUsername'>
            <Form.Control className={styles.registerInput} value={username} onChange={e => setUsername(e.target.value)} type='text' placeholder='username' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Control className={styles.registerInput} value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='password' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPhone'>
            <Form.Control className={styles.registerInput} value={phone} onChange={e => setPhone(e.target.value)} type='text' placeholder='phone number' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formFile'>
            <Form.Label className={styles.registerInputLabel}>upload avatar</Form.Label>
            <Form.Control type='file' onChange={e => setAvatar(e.target.files[0])} className={styles.avatarFileInput} placeholder='avatar' />
          </Form.Group>

          <Button className={styles.button} variant="primary" type='submit'>Submit</Button>
        </Form>
      </Card>
    </section>
  );
};

  export default Register;