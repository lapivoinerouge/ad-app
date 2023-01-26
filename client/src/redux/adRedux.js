import axios from 'axios';
import { API_URL } from '../config';

//selectors
export const getAds = ({ ads }) => ads;
export const getAdById = ({ ads }, adId) => ads.data.find(ad => ad.id === adId);
export const getRequests = ({ ads }) => ads;

// action creators
const createActionName = actionName => `app/ads/${actionName}`;

const UPDATE_ADS = createActionName('UPDATE_ADS');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// actions
export const updateAds = payload => ({ type: UPDATE_ADS, payload });

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

// thunk
export const loadSearchedAdsRequest = searchPhrase => {
  return async dispatch => {

    // dispatch(startRequest({ name: 'LOAD_SEARCHED_ADS' }));
    try {
      let res = await axios.get(`${API_URL}ads/search/${searchPhrase}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      dispatch(updateAds(res.data));
      // dispatch(endRequest({ name: 'LOAD_SEARCHED_ADS' }));
    } catch(e) {
      // dispatch(errorRequest({ name: 'LOAD_SEARCHED_ADS', error: e.message }));
    }

  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ADS:
			return [...action.payload];
    // case START_REQUEST:
    //   return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    // case END_REQUEST:
    //   return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    // case ERROR_REQUEST:
    //   return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  };
};

export default adsReducer;