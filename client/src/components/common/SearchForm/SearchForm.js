import { Button, InputGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/search/${searchInput}`)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder='Search' type="text" />
        <Button variant="primary" type='submit'>Submit</Button>
      </InputGroup>
    </Form>
  );
};

  export default SearchForm;