const ownProjectListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_OWN_PROJECT_LIST":
      return action.payload;
    case "ADD_OWN_PROJECT":
      return [...state, action.payload];
    case "REMOVE_OWN_PROJECT":
      return state.filter((project) => {
        if (project.id != action.payload.id) {
          return project;
        }
      });
    default:
      return state;
  }
};

export default ownProjectListReducer;
