import { faRightFromBracket, faRightToBracket, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
      <Navbar bg='primary' variant='dark' expand='sm' className='mb-4 rounded'>
        <Container>
          <Navbar.Brand as={NavLink} to='/'>TableManager.app</Navbar.Brand>
          <Nav className='me-2'>
            <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
            {user && 
            <Nav.Link as={NavLink} to='/ad/add'>
              <FontAwesomeIcon icon={faSquarePlus} title='Add ad' />
            </Nav.Link>}
              {!user && 
              <Nav.Link as={NavLink} to='/login'>
                <FontAwesomeIcon icon={faRightToBracket} title='Log in' />
              </Nav.Link>}
              {user && 
              <Nav.Link as={NavLink} to='/logout'>
                <FontAwesomeIcon icon={faRightFromBracket} title='Log out' />
              </Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
  );
}

export default NavBar;