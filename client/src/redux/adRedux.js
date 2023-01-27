import axios from 'axios';
import { API_URL } from '../config';

//selectors
export const getAds = ({ ads }) => ads.data;
export const getAdById = ({ ads }, adId) => ads.data.find(ad => ad.id === adId);
export const getRequests = ({ ads }) => ads.request;

// action creators
const createActionName = actionName => `app/ads/${actionName}`;

const LOAD_ADS = createActionName('LOAD_ADS');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// actions
export const loadAds = payload => ({ type: LOAD_ADS, payload });

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

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