import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAds, getRequests, loadAds } from "../../../redux/adRedux";
import { Alert, Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import AdCard from '../AdCard/AdCard';
import { API_URL } from '../../../config';

const SearchedAds = props => {
  const dispatch = useDispatch();

  const ads = useSelector(getAds);
  const requests = useSelector(getRequests);
  const searchPhrase = props.searchPhrase;

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
    }

    fetch(`${API_URL}/ads/search/${searchPhrase}`, options)
      .then(res => {
        return res.json()
        .then(res =>
          dispatch(loadAds(res))
        )
      });
  }, []);

  if (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) return (
    <Alert variant='danger'>
      <Alert.Heading>Something went wrong...</Alert.Heading>
      <p>{requests['LOAD_SEATS'].error}</p>
    </Alert>
  )
  else if (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
  ) 
  else if (ads.length === 0) return (
    <p>No results found. Try again with different keywords.</p>
  )
  else return (
    <Row sm={1} md={3} className="g-4">
      {ads.map(ad => (
        <AdCard key={ad._id} price={parseFloat(ad.price).toFixed(2)} image={ad.image} title={ad.title} location={ad.location} />
      ))}
    </Row>
  );
}

export default SearchedAds;