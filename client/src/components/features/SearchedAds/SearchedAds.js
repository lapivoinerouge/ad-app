import Ads from '../Ads/Ads';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { loadSearchedAdsRequest } from "../../../redux/adRedux";
import SearchForm from '../../common/SearchForm/SearchForm';

const SearchedAds = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props.searchPhrase)
    dispatch(loadSearchedAdsRequest(props.searchPhrase));
  }, []);

  return (
    <>
      <SearchForm />
      <Ads />
    </>
  );
}

export default SearchedAds;