import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_URL } from "../../../config";
import { logOut } from "../../../redux/userRedux";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include'
    };
  
    fetch(`${AUTH_URL}/logout`, options)
      .then((res) => {
        if (res.status === 204) {
          dispatch(logOut());
          navigate('/');
        }
      });
  }, []);

  return null;
};

  export default Logout;