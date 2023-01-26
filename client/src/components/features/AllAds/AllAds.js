import Ads from '../Ads/Ads';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateAds } from "../../../redux/adRedux";
import { io } from "socket.io-client";
import { SERVER_URL } from '../../../config';
import SearchForm from '../../common/SearchForm/SearchForm';

const AllAds = () => {
  const dispatch = useDispatch();

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
    <>
      <SearchForm />
      <Ads />
    </>
  );
}

export default AllAds;