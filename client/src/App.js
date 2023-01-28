import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Error from './components/pages/Error/Error';
import Home from './components/pages/Home/Home';
import Header from './components/views/Header/Header';
import SearchResults from './components/pages/Search/Search';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserRequest, logIn } from './redux/userRedux';
import { AUTH_URL } from './config';
import ViewAd from './components/pages/ViewAd/ViewAd';

const App = () => {
  const dispatch = useDispatch();

  // TODO: handle 401 errors in console
  // useEffect(() => {
  //   dispatch(fetchUserRequest());
  // }, []);

  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchPhrase" element={<SearchResults />} />
          <Route path="/ad/:id" element={<ViewAd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='*' element={<Error />} />
        </Routes>
    </Container>
   </main>
  );
}

export default App;