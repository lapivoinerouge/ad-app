import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import Home from './components/pages/Home/Home';
import Header from './components/views/Header/Header';
import SearchResults from './components/pages/SearchResults/SearchResults';

const App = () => {
  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchPhrase" element={<SearchResults />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
    </Container>
   </main>
  );
}

export default App;