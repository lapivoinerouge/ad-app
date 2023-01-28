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
import { logIn } from './redux/userRedux';
import { AUTH_URL } from './config';
import Ad from './components/pages/Ad/Ad';

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     credentials: 'include',
  //   }

  //   fetch(`${AUTH_URL}/user`, options)
  //     .then(res => {
  //       if (res.status === 200) {
  //         return res.json().then((res) => {
  //           console.log(res);
  //           dispatch(logIn(res));
  //         });
  //       }
  //     });
  // }, []);

  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchPhrase" element={<SearchResults />} />
          <Route path="/ad/:id" element={<Ad />} />
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