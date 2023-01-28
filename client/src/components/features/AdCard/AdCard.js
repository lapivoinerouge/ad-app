import styles from './AdCard.module.scss';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCoins } from '@fortawesome/free-solid-svg-icons';
import { IMAGES_URL } from '../../../config';
import { NavLink } from 'react-router-dom';

const AdCard = props => {
  return (
    <Col>
      <NavLink className={styles.cardLink} to={`/ad/${props.id}`}>
        <Card>
          <Card.Img variant="top" style={{ height: '20rem', width: '100%', objectFit: 'cover' }} src={IMAGES_URL + props.image} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faLocationDot} />
              {` ${props.location}`}
            </Card.Text>
            <Card.Text>
              <FontAwesomeIcon icon={faCoins} />
              {` ${props.price}`}
            </Card.Text>
          </Card.Body>
        </Card>
      </NavLink>
    </Col> 
  );
}

AdCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default AdCard;