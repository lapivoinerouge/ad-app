import { Nav, Navbar, Container, NavLink } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg='primary' variant='dark' expand='sm' className='mt-4 mb-4 rounded'>
        <Container>
          <Navbar.Brand href='/'>TableManager.app</Navbar.Brand>
          <Nav className='me-2'>
            <Nav.Link as={NavLink} href='/'>Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default NavBar;