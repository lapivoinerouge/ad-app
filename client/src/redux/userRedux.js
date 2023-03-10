import axios from "axios";

import { AUTH_URL } from "../config";

//selectors
export const getUser = ({ user }) => user;

// action creators
const createActionName = actionName => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

// actions
export const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });

// thunk
export const fetchUserRequest = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${AUTH_URL}/user`, { withCredentials: 'true' });
      dispatch(logIn(res.data));
    } catch (e) {
      console.log(e);
    }
  };
}

const userReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOG_IN:
			return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  };
};

export default userReducer;