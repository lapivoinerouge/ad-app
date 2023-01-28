import { Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdRequest, getRequest } from "../../../redux/adRedux";
import { getUser } from "../../../redux/userRedux";
import AdForm from "../AdForm/AdForm";

const AddAdForm = () => {
  const user = useSelector(getUser);
  const request = useSelector(state => getRequest(state, 'ADD_AD'));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddAd = newAd => {
    dispatch(addAdRequest(newAd)).then(() => navigate('/'));
  };

  if(!user) return(
    <Alert variant='warning'>
      <Alert.Heading>You need to be logged in.</Alert.Heading>
    </Alert>
  )
  return (
    <>
      { request.pending && 
        <Spinner animation='border' role='status' style={{ marginLeft: '50%' }}>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>}
      { request.success &&
        <Alert variant='success'>
          <Alert.Heading>Your ad has been created.</Alert.Heading>
        </Alert>
        }
        <AdForm
        action={handleAddAd}
        actionText='Add ad' />
    </>
  )
};

export default AddAdForm;