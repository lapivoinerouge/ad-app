import styles from './AdCard.module.scss';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCoins } from '@fortawesome/free-solid-svg-icons';
import { IMAGES_URL } from '../../../config';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const AdCard = props => {
  return (
    <Col className={clsx('col-12 col-lg-6 col-xl-4', styles.column)}>
      <NavLink className={styles.cardLink} to={`/ad/${props.id}`}>
        <Card className={styles.card}>
          <Card.Img variant="top" style={{ height: '20rem', width: '100%', objectFit: 'cover' }} src={IMAGES_URL + (props.image ? props.image : 'no-img.png')} />
          <Card.Body className={styles.cardBody}>
            <Card.Title><p className={styles.cardText}>{props.title}</p></Card.Title>
            <Card.Text className={styles.cardText}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faLocationDot} />
              {props.location}
            </Card.Text>
            <Card.Text className={styles.cardText}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCoins} />
              {props.price}
            </Card.Text>
          </Card.Body>
        </Card>
      </NavLink>
    </Col> 
  );
}

AdCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default AdCard;