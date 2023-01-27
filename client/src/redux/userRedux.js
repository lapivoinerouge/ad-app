//selectors
export const getUser = ({ user }) => user;

// action creators
const createActionName = actionName => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');

// actions
export const logIn = payload => ({ type: LOG_IN, payload });

const userReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOG_IN:
			return action.payload;
    default:
      return statePart;
  };
};

export default userReducer;