import Row from 'react-bootstrap/Row';
import AdCard from '../AdCard/AdCard'
import { useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adRedux";

const Ads = () => {
  const ads = useSelector(getAllAds);

  return (
    <Row xs={1} md={2} className="g-4">
      {ads.map(ad => (
        <AdCard key={ad._id} image={ad.image} title={ad.title} location={ad.location} />
      ))}
  </Row>
  );
}

export default Ads;