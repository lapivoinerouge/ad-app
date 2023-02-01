import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCoins, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { Col, Card, Row, Button, Modal } from 'react-bootstrap';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteAdRequest } from '../../../redux/adRedux';
import styles from './Ad.module.scss';
import clsx from "clsx";

const Ad = props => {
  const user = useSelector(getUser);
  const isSeller = user ? user.username === props.seller : false;

  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShow = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  const handleDelete = e => {
    e.preventDefault();

    dispatch(deleteAdRequest(props.id));
    navigate('/');
  }

  return (
    <Row>
      {/* ad info */}
      <Col className='col-12 col-sm-8 mx-auto'>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>{props.title}</Card.Title>
            <Card.Img variant="top" className={styles.adImg} src={props.image} />
            <Card className={styles.card}>
              <Card.Body>
                <Card.Text>
                <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
                  {props.location}
                </Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faCoins} className={styles.icon}  />
                  {props.price}
                </Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faClock} className={styles.icon}  />
                  <Moment date={new Date(props.published)} fromNow />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card.Text className={styles.contextText}>
              {props.content}
            </Card.Text>
            {isSeller && 
            <div className={styles.buttonContainer}>
              <Button className={styles.button} as={NavLink} to={`/ad/edit/${props.id}`}>Edit</Button>
              <Button className={clsx(styles.button, styles.buttonDanger)} onClick={handleShow}>Delete</Button>
            </div>}
          </Card.Body>
        </Card>
      </Col>
      {/* seller info */}
      <Col className='col-sm-12 col-md-4 mx-auto'>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.sellerTitle}>{props.seller}</Card.Title>
            <Card.Img variant="top" className={styles.sellerAvatar} src={props.sellerAvatar} />
            <Card.Text className={styles.sellerPhone}>
              <FontAwesomeIcon icon={faPhone} className={styles.icon} />
              {props.sellerPhone}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
      <Modal className={styles.modal} show={showDialog} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this ad?</p>
          <p>This action is irreversible.</p></Modal.Body>
        <Modal.Footer>
          <Button className={styles.button} onClick={handleClose}>
            Close
          </Button>
          <Button className={clsx(styles.button, styles.buttonDanger)} onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </Row>
  );
}

Ad.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  sellerAvatar: PropTypes.string.isRequired,
  sellerPhone: PropTypes.string.isRequired
};

export default Ad;