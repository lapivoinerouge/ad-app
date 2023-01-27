import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Navbar, Container, NavLink } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';

const NavBar = () => {
  const user = useSelector(getUser);

    return (
        <Navbar bg='primary' variant='dark' expand='sm' className='mb-4 rounded'>
          <Container>
            <Navbar.Brand href='/'>TableManager.app</Navbar.Brand>
            <Nav className='me-2'>
              <Nav.Link as={NavLink} href='/'>Home</Nav.Link>
                {!user && 
                <Nav.Link as={NavLink} href='/login'>
                  <FontAwesomeIcon icon={faRightToBracket} title='Log in' />
                </Nav.Link>}
                {user && 
                <Nav.Link as={NavLink} href='/logout'>
                  <FontAwesomeIcon icon={faRightFromBracket} title='Log out' />
                </Nav.Link>}
            </Nav>
          </Container>
        </Navbar>
    );
}

export default NavBar;