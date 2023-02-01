import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdRequest, getRequest } from "../../../redux/adRedux";
import { getUser } from "../../../redux/userRedux";
import AdForm from "../AdForm/AdForm";
import styles from './AddAdForm.module.scss';

const AddAdForm = () => {
  const user = useSelector(getUser);
  const request = useSelector(getRequest);

  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddAd = async newAd => {
    setPending(true);
    dispatch(addAdRequest(newAd));
    if (request.success) {
      setSuccess(true);
      setPending(false);
      await new Promise(r => setTimeout(r, 1500)).then(() => navigate('/'));
    } else if (request.error) {
      setError(true);
      setPending(false);
    }
  };

  if(!user) return(
    <Alert className={styles.alert} variant='warning'>
      <Alert.Heading>You need to be logged in.</Alert.Heading>
    </Alert>
  )
  return (
    <>
      { pending && 
        <Spinner className={styles.spinner} animation='border' role='status' style={{ marginLeft: '50%' }}>
          <span className='visually-hidden'></span>
        </Spinner>}
      { success &&
        <Alert className={styles.alert} variant='success'>
          <Alert.Heading>Your ad has been created.</Alert.Heading>
        </Alert>}
      { error &&
        <Alert className={styles.alert} variant='danger'>
          <Alert.Heading>Something went wrong...</Alert.Heading>
        </Alert>}
      <AdForm
      action={handleAddAd} />
    </>
  )
};

export default AddAdForm;