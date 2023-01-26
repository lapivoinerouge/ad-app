import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { IMAGES_URL } from '../../../config';

const Ad = props => {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" style={{ height: '20rem', width: '100%', objectFit: 'cover' }} src={IMAGES_URL + props.image} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            <FontAwesomeIcon icon={faLocationDot} />
            {` ${props.location}`}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col> 
  );
}

Ad.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default Ad;