import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { API_URL, IMAGES_URL } from "../../../config";
import PageTitle from "../../common/PageTitle/PageTitle";
import Ad from "../../features/Ad/Ad";

const ViewAd = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
    }

    setPending(true);
    fetch(`${API_URL}/ads/${id}`, options)
      .then(res => {
        if (res.status === 200) {
          return res.json()
          .then(res => {
            setAd(res);
            setSuccess(true);
          })
        } else if (res.status === 404) {
          setNotFound(true);
        }
      })
      .catch(err => console.log(err));
      setPending(false);
  }, [dispatch]);

  return (
    <section>
      <PageTitle/>
    { notFound &&
    <Alert variant='danger'>
      <Alert.Heading>Ad doesn't exist or has been deleted.</Alert.Heading>
    </Alert>}
    { pending && 
      <Spinner animation='border' role='status' style={{ marginLeft: '50%' }}>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>}
    { success &&
      <Ad
      id={id}
      image={IMAGES_URL + (ad.image ? ad.image : 'no-img.png')} 
      title={ad.title} 
      location={ad.location} 
      price={parseFloat(ad.price).toFixed(2)}
      published={ad.published}
      content={ad.content}
      seller={ad.author.username}
      sellerAvatar={IMAGES_URL + (ad.author.avatar ? ad.author.avatar : 'no-avatar.png')}
      sellerPhone={ad.author.phoneNumber} />}
    </section>
  )
}

export default ViewAd;