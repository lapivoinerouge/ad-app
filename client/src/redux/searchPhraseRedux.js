// selectors
export const getSearchPhrase = ({ searchPhrase }) => searchPhrase;

// actions
const createActionName = actionName => `app/searchphrase/${actionName}`;
const UPDATE_SEARCHPHRASE = createActionName('UPDATE_SEARCHPHRASE');

// actions creators
export const updateSearchPhrase = payload => ({ type: UPDATE_SEARCHPHRASE, payload });

const searchPhraseReducer = (statePart = '', action) => {
    switch(action.type) {
      case UPDATE_SEARCHPHRASE:
        return action.payload;
      default:
        return statePart;
    }
  }

  export default searchPhraseReducer;