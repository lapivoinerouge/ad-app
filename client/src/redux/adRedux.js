import axios from 'axios';
import { API_URL } from '../config';

//selectors
export const getAds = ({ ads }) => ads.data;
export const getAdById = ({ ads }, adId) => ads.data.find(ad => ad._id === adId);
export const getRequest = ({ ads }) => ads.request;

// action creators
const createActionName = actionName => `app/ads/${actionName}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const DELETE_AD = createActionName('DELETE_AD');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// actions
export const loadAds = payload => ({ type: LOAD_ADS, payload });
export const deleteAd = payload => ({ type: DELETE_AD, payload });

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

// thunk
export const loadAllAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOAD_ADS' }));
    try {
      let res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: 'LOAD_ADS' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }
  };
}

export const deleteAdRequest = id => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'DELETE_AD' }));
    try {
      await axios.delete(`${API_URL}/ads/${id}`, { withCredentials: 'true' });
      dispatch(loadAllAdsRequest);
      dispatch(endRequest({ name: 'DELETE_AD' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'DELETE_AD', error: e.message }));
    }
  };
}

export const updateAdRequest = (ad, id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'UPDATE_AD' }));
    try {
      const options = {
        withCredentials: 'true', 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      await axios.put(`${API_URL}/ads/${id}`, ad, options);
      dispatch(loadAllAdsRequest);
      dispatch(endRequest({ name: 'UPDATE_AD' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'UPDATE_AD', error: e.message }));
    }
  };
}

export const addAdRequest = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'ADD_AD' }));
    try {
      const options = {
        withCredentials: 'true', 
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      await axios.post(`${API_URL}/ads`, ad, options);
      dispatch(loadAllAdsRequest);
      dispatch(endRequest({ name: 'ADD_AD' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'ADD_AD', error: e.message }));
    }
  };
}

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS:
			return {...statePart, data: action.payload};
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  };
};

export default adsReducer;