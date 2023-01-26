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
    <Form>
      <InputGroup className="mb-3">
        <Form.Control value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder='Search' type="text" />
        <Button color="outline-primary" onClick={handleSubmit}>Search</Button>
      </InputGroup>
    </Form>
  );
};

  export default SearchForm;