import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Error from './components/pages/Error/Error';
import Home from './components/pages/Home/Home';
import Header from './components/views/Header/Header';
import SearchResults from './components/pages/Search/Search';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import ViewAd from './components/pages/ViewAd/ViewAd';
import EditAd from './components/pages/EditAd/EditAd';
import AddAd from './components/pages/AddAd/AddAd';
import Footer from './components/views/Footer/Footer';

/* styles */
import styles from "./styles/global.scss";

const App = () => {
  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchPhrase" element={<SearchResults />} />
          <Route path="/ad/:id" element={<ViewAd />} />
          <Route path="/ad/add" element={<AddAd />} />
          <Route path="/ad/edit/:id" element={<EditAd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='*' element={<Error />} />
        </Routes>
    </Container>
    <Footer />
   </main>
  );
}

export default App;