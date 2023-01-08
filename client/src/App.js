import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import Home from './components/pages/Home/Home'


const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
   </main>
  );
}

export default App;