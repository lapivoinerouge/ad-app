import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import Home from './components/pages/Home/Home';
import Header from './components/views/Header/Header';


const App = () => {
  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
    </Container>
   </main>
  );
}

export default App;