const listUserReducer = (
  state = [
   
  ],
  action
) => {
  switch (action.type) {
    case "SET_USER_LIST":
      return action.payload;
    case "ADD_USER_LIST":
      return [...state, action.payload];

    default:
      return state;
  }
};

export default listUserReducer;
