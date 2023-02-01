import { Button, InputGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.scss'

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/search/${searchInput}`);
  }

  return (
    <Form className={styles.searchDiv} onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control className={styles.searchInput} value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder='Search' type="search" />
        <Button className={styles.searchButton} type='submit'>Submit</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchForm;