import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAds } from "../../../redux/adRedux";
import { io } from "socket.io-client";
import { SERVER_URL } from '../../../config';
import { Row, Spinner } from 'react-bootstrap';
import AdCard from '../AdCard/AdCard';
import styles from './AllAds.module.scss';

const AllAds = () => {
  const ads = useSelector(getAds);
  const [pending, setPending] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on('updatedAds', async updatedAds => {
      setPending(true);
      updatedAds.sort(function(a,b){
        return new Date(b.published) - new Date(a.published);
      });
      dispatch(loadAds(updatedAds));
      setPending(false);
    });
  }, []);

  if (pending) return (
    <Spinner animation='border' role='status' className={styles.spinner}>
      <span className='visually-hidden'></span>
    </Spinner>
  )
  else return (
    <Row className="g-4">
      {ads.length > 0 && ads.map(ad => (
        <AdCard key={ad._id} id={ad._id} price={parseFloat(ad.price).toFixed(2)} image={ad.image} title={ad.title} location={ad.location} />
      ))}
      {ads.length === 0 && 
      <p className={styles.noResultText}>No results found</p>}
    </Row>
  );
}

export default AllAds;