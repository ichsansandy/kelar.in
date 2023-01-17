const menuReducer = (
  state = [
    { name: "Home", href: "/", current: true },
    { name: "Projects", href: "/projects", current: false },
    { name: "Calendar", href: "/calendar", current: false },
  ],
  action
) => {
  switch (action.type) {
    case "HOME":
      return [...state, (state[0].current = true)];
    case "PROJECTS":
      return [...state, (state[1].current = true)];
    case "CALENDAR":
      return [...state, (state[2].current = true)];
    case "NOT_HOME":
      return [...state, (state[0].current = false)];
    case "NOT_PROJECTS":
      return [...state, (state[1].current = false)];
    case "NOT_CALENDAR":
      return [...state, (state[2].current = false)];
    default:
      return state;
  }
};

export default menuReducer;
