//selectors

// actions
// eslint-disable-next-line
const createActionName = actionName => `app/ads/${actionName}`;

// action creators
const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  };
};
export default adsReducer;