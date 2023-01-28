import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAds } from "../../../redux/adRedux";
import { io } from "socket.io-client";
import { SERVER_URL } from '../../../config';
import { Row, Spinner } from 'react-bootstrap';
import AdCard from '../AdCard/AdCard'

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

export default AllAds;