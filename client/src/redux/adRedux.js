//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, adId) => ads.find(ad => ad.id === adId);

// action creators
const createActionName = actionName => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName('UPDATE_ADS');

// actions
export const updateAds = payload => ({ type: UPDATE_ADS, payload });

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ADS:
			return [...action.payload];
    default:
      return statePart;
  };
};
export default adsReducer;