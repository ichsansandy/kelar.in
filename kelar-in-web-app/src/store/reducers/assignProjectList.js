const assignProjectListReducer = (
  state = [
    { id: 1, projectName: "HealMe", projectOwner: "Hilmi" },
    { id: 2, projectName: "Takoni", projectOwner: "Oka" },
    { id: 3, projectName: "Mosewa", projectOwner: "Ammar" },
  ],
  action
) => {
  switch (action.type) {
    case "SET_ASSIGN_PROJECT_LIST":
      return action.payload;
    case "ADD_ASSIGN_PROJECT":
      return [...state, action.payload];
    case "REMOVE_ASSIGN_PROJECT":
      return state.filter(project => {
        if(project.id != action.payload.id){
            return project
        }
      })
    default:
      return state;
  }
};

export default assignProjectListReducer;
