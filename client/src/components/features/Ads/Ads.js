import Row from 'react-bootstrap/Row';
import { useSelector } from "react-redux";
import { getAds } from "../../../redux/adRedux";
import AdCard from '../AdCard/AdCard'

const Ads = props => {
  const ads = useSelector(getAds);

  return (
    <Row sm={1} md={3} className="g-4">
      {ads.map(ad => (
        <AdCard key={ad._id} price={parseFloat(ad.price).toFixed(2)} image={ad.image} title={ad.title} location={ad.location} />
      ))}
    </Row>
  );
}

export default Ads;