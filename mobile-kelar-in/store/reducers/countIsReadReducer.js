const countIsReadReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_COUNT_IS_READ":
      return action.payload;
    default:
      return state;
  }
};

export default countIsReadReducer;
