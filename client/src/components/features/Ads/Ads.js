import Row from 'react-bootstrap/Row';
import AdCard from '../AdCard/AdCard'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllAds, updateAds } from "../../../redux/adRedux";
import { io } from "socket.io-client";
import { SERVER_URL } from '../../../config';

const Ads = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on('updatedAds', updatedAds => {
      updatedAds.sort(function(a,b){
        return new Date(b.published) - new Date(a.published);
      });
      dispatch(updateAds(updatedAds));
    });
  }, []);

  return (
    <Row xs={1} md={2} className="g-4">
      {ads.map(ad => (
        <AdCard key={ad._id} image={ad.image} title={ad.title} location={ad.location} />
      ))}
  </Row>
  );
}

export default Ads;