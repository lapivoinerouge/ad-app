import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAds } from "../../../redux/adRedux";
import { Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import AdCard from '../AdCard/AdCard';
import { API_URL } from '../../../config';
import styles from './SearchedAds.module.scss';

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
  }, [searchPhrase]);

  if (ads.length === 0) return (
    <p className={styles.noResultText}>No results found. Try again with different keywords.</p>
  )
  else if (pending) return (
    <Spinner animation='border' role='status' className={styles.spinner}>
      <span className='visually-hidden'></span>
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