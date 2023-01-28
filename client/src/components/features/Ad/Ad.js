import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCoins, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { Col, Card, Row, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';
import { NavLink } from 'react-router-dom';

const Ad = props => {
  const user = useSelector(getUser);
  const isSeller = user.username !== props.seller;

  return (
    <Row>
      {/* ad info */}
      <Col className='col-12 col-sm-7 mx-auto'>
        <Card style={{ textAlign: 'center' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '3rem' }}>{props.title}</Card.Title>
            <Card.Img variant="top" style={{ height: '20rem', width: '70%', objectFit: 'cover', margin: '1rem auto' }} src={props.image} />
            <Card>
              <Card.Body>
                <Card.Text>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '5px' }}  />
                  {props.location}
                </Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faCoins} style={{ marginRight: '5px' }}  />
                  {props.price}
                </Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} />
                  <Moment date={new Date(props.published)} fromNow />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card.Text style={{ margin: '2rem 1rem'}}>
              {props.content}
            </Card.Text>
            {isSeller && 
            <div style={{ display: 'flex', justifyContent: 'center', columnGap: '10px' }}>
              <Button variant="primary" as={NavLink} to='/'>Edit</Button>
              <Button variant="danger" as={NavLink} to='/'>Delete</Button>
            </div>}
          </Card.Body>
        </Card>
      </Col>
      {/* seller info */}
      <Col className='col-sm-12 col-md-5 mx-auto'>
        <Card style={{ textAlign: 'center' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '2rem' }}>{props.seller}</Card.Title>
            <Card.Img variant="top" style={{ height: '20rem', width: '70%', objectFit: 'cover', margin: '2rem auto' }} src={props.sellerAvatar} />
            <Card.Text>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} />
              {props.sellerPhone}
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