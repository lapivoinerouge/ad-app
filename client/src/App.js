import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import Home from './components/pages/Home/Home';
import Header from './components/views/Header/Header';
import SearchResults from './components/pages/Search/Search';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';

const App = () => {
  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/search/:searchPhrase" element={<SearchResults />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
    </Container>
   </main>
  );
}

export default App;