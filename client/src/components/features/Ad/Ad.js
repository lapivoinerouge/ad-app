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
              <Button variant="primary" as={NavLink} to={`/ad/edit/${props.id}`}>Edit</Button>
              <Button variant="danger" onClick={handleShow}>Delete</Button>
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
      
      <Modal style={{ textAlign: 'center' }} show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this ad?</p>
          <p>This action is irreversible.</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </Row>
  );
}

Ad.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default Ad;