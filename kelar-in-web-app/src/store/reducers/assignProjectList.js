const assignProjectListReducer = (
  state = [
    { id: 1, name: "HealMe", user: { name: "Hilmi" } },
    { id: 2, name: "Takoni", user: { name: "Oka" } },
    { id: 3, name: "Mosewa", user: { name: "Ammar" } },
    { id: 4, name: "Mosewa", user: { name: "Ammar" } },
    { id: 5, name: "Mosewa", user: { name: "Ammar" } },
    { id: 6, name: "Mosewa", user: { name: "Ammar" } },
    { id: 7, name: "Mosewa", user: { name: "Ammar" } },
    { id: 8, name: "Mosewa", user: { name: "Ammar" } },
  ],
  action
) => {
  switch (action.type) {
    case "SET_ASSIGN_PROJECT_LIST":
      return action.payload;
    case "ADD_ASSIGN_PROJECT":
      return [...state, action.payload];
    case "REMOVE_ASSIGN_PROJECT":
      return state.filter((project) => {
        if (project.id != action.payload.id) {
          return project;
        }
      });
    default:
      return state;
  }
};

export default assignProjectListReducer;
