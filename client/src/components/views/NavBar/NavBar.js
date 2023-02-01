import { faRightFromBracket, faRightToBracket, faSquarePlus, faTree } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Navbar, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';
import { clsx } from 'clsx';
import SearchForm from '../../common/SearchForm/SearchForm';
 
import styles from './NavBar.module.scss';
import { IMAGES_URL } from '../../../config';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
      <Navbar variant='light' expand='lg' className={clsx('md-3 py-3', styles.navbar)}>
        <div className={styles.container}>
          <Navbar.Brand className={styles.navbarLogo} as={NavLink} to='/'>
            <FontAwesomeIcon className={styles.navbarLogoIcon} icon={faTree} title='Add ad' />
            <span className={styles.navbarLogoText}> rubbertree</span>
          </Navbar.Brand>
          <SearchForm />
          <Navbar.Collapse className={styles.collapse} id='navbarNavDropdown'>
            <Nav className={clsx('me-2', styles.navActions)}>
              {user && 
              <Nav.Link className={styles.navbarLink} as={NavLink} to='/ad/add'>
                <FontAwesomeIcon icon={faSquarePlus} title='Add ad' />
              </Nav.Link>}
                {!user && 
                <Nav.Link className={styles.navbarLink} as={NavLink} to='/login'>
                  <FontAwesomeIcon icon={faRightToBracket} title='Log in' />
                </Nav.Link>}
                {user && 
                <Nav.Link className={styles.navbarLink} as={NavLink} to='/logout'>
                  <FontAwesomeIcon icon={faRightFromBracket} title='Log out' />
                </Nav.Link>}
                {user && 
                <Card.Img variant="top" className={styles.avatar} src={IMAGES_URL + (user.avatar ? user.avatar : 'no-avatar.png')} />}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle className={styles.toggler} aria-controls="navbarNavDropdown" />
        </div>
      </Navbar>
  );
}

export default NavBar;