const ownProjectListReducer = (
  state = [
    { id: 1, projectName: "kelar-in-WebApp", projectOwner: "Ichsan" },
    { id: 2, projectName: "kelar-in-WebApp", projectOwner: "Ichsan" },
    { id: 3, projectName: "kelar-in-WebApp", projectOwner: "Ichsan" },
    { id: 4, projectName: "kelar-in-WebApp", projectOwner: "Ichsan" },
  ],
  action
) => {
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
