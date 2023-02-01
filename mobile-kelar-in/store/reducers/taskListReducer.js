const taskListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TASK_LIST":
      return action.payload;
    case "ADD_TASK_LIST":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default taskListReducer;
