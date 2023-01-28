import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAds } from "../../../redux/adRedux";
import { Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import AdCard from '../AdCard/AdCard';
import { API_URL } from '../../../config';

const SearchedAds = props => {
  const ads = useSelector(getAds);
  const searchPhrase = props.searchPhrase;
  const [pending, setPending] = useState(false);

  const dispatch = useDispatch();  

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
    }

    setPending(true);
    fetch(`${API_URL}/ads/search/${searchPhrase}`, options)
      .then(res => {
        return res.json()
        .then(res => {
          dispatch(loadAds(res));
        })
      })
      setPending(false);
  }, []);

  if (ads.length === 0) return (
    <p>No results found. Try again with different keywords.</p>
  )
  else if (pending) return (
    <Spinner animation='border' role='status' style={{ marginLeft: '50%' }}>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
  else return (
    <Row sm={1} md={3} className="g-4">
      {ads.map(ad => (
        <AdCard key={ad._id} id={ad._id} price={parseFloat(ad.price).toFixed(2)} image={ad.image} title={ad.title} location={ad.location} />
      ))}
    </Row>
  );
}

export default SearchedAds;