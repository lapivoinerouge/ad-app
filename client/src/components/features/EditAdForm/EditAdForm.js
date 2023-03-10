import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import { updateAdRequest } from "../../../redux/adRedux";
import { getUser } from "../../../redux/userRedux";
import AdForm from "../AdForm/AdForm";
import styles from "./EditAdForm.module.scss";

const EditAdForm = () => {
  const { id } = useParams();
  const user = useSelector(getUser);

  const [ad, setAd] = useState(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          .then((res) => {
            setAd(res);
            setSuccess(true);
          })
        } else if (res.status === 404) {
          setNotFound(true);
        }
      })
      .catch(err => console.log(err));
      setPending(false);
  }, []);

  const handleEditAd = updatedAd => {
    dispatch(updateAdRequest(updatedAd, id)).then(() => navigate('/'));
  };

  if(!user) return(
    <Alert className={styles.alert} variant='danger'>
      <Alert.Heading>You don't have permissions to see the content of this page.</Alert.Heading>
    </Alert>
  )
  return (
    <>
      { notFound &&
        <Alert className={styles.alert} variant='danger'>
          <Alert.Heading>Ad doesn't exist or has been deleted.</Alert.Heading>
        </Alert>}
      { pending && 
        <Spinner animation='border' role='status' className={styles.spinner}>
          <span className='visually-hidden'></span>
        </Spinner>}
      { success &&
        <AdForm
        action={handleEditAd}
        id={ad._id}
        title={ad.title}
        content={ad.content}
        price={ad.price}
        location={ad.location}
        image={ad.image}
        />}
    </>
  )
};

export default EditAdForm;