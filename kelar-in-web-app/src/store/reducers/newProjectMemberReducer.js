const newProjectMemberReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MEMBER":
      return action.payload;
    case "ADD_MEMBER":
      return [...state, action.payload];
    case "REMOVE_MEMBER":
      return state.filter((user) => {
        if (user != action.payload) {
          return user;
        }
      });
    default:
      return state;
  }
};

export default newProjectMemberReducer;
