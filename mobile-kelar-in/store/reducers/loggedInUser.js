const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER_LOGGEDIN":
      return action.payload;
    case "REMOVE_USER_LOGGEDIN":
      return null;
    default:
      return state;
  }
};

export default loggedInUserReducer;
