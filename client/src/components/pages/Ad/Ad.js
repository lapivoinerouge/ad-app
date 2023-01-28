import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCoins, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { IMAGES_URL, API_URL, AUTH_URL } from '../../../config';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, Col, Card, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logIn } from '../../../redux/userRedux';
import Moment from 'react-moment';

const Ad = () => {
  const { id } = useParams();
  const user = useSelector(getUser);

  const [ad, setAd] = useState(null);
  const [pending, setPending] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
    }

    fetch(`${AUTH_URL}/user`, options)
      .then(res => {
        if (res.status === 200) {
          return res.json().then((res) => {
            console.log(res);
            dispatch(logIn(res));
          });
        }
      });
  }, []);

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
    }

    setPending(true);
    fetch(`${API_URL}/ads/${id}`, options)
      .then(res => {
        if (res.status === 200) {
          return res.json()
          .then(res => {
            setAd(res);
          })
        } else if (res.status === 404) {
          setNotFound(true);
        }
      })
      setPending(false);
  }, []);

  if (pending) return (
    <Spinner animation='border' role='status' style={{ marginLeft: '50%' }}>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
  else if (notFound || !ad) return (
    <Alert variant='danger'>
      <Alert.Heading>Ad doesn't exist or has been deleted.</Alert.Heading>
    </Alert>
  )
  else return (
    <Row>
      <Col className='col-12 col-sm-7 mx-auto'>
        <Card style={{ textAlign: 'center' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '3rem' }}>{ad.title}</Card.Title>
            <Card.Img variant="top" style={{ height: '20rem', width: '70%', objectFit: 'cover', margin: '1rem auto' }} src={IMAGES_URL + ad.image} />
            <Card>
              <Card.Body>
                <Card.Text>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '5px' }}  />
                  {ad.location}
                </Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faCoins} style={{ marginRight: '5px' }}  />
                  {ad.price}
                </Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} />
                  <Moment date={new Date(ad.published)} fromNow />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card.Text style={{ margin: '2rem 1rem'}}>
              {ad.content}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className='col-sm-12 col-md-5 mx-auto'>
        <Card style={{ textAlign: 'center' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '2rem' }}>{user.username}</Card.Title>
            <Card.Img variant="top" style={{ height: '20rem', width: '70%', objectFit: 'cover', margin: '2rem auto' }} src={IMAGES_URL + user.avatar} />
            <Card.Text>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} />
              {user.phoneNumber}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

Ad.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default Ad;