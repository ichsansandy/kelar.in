const menuReducer = (
  state = [
    { name: "Home", href: "/", current: true },
    { name: "Projects", href: "/projects", current: false },
    { name: "Calendar", href: "/calendar", current: false },
  ],
  action
) => {
  switch (action.type) {
    case "MENU_LOGIN":
      return menuLogin;
    case "MENU_NOT_LOGIN":
      return menuNotLoggin;
    default:
      return state;
  }
};

const menuNotLoggin = [
  { name: "Register", href: "/register", current: false },
  { name: "Login", href: "/login", current: false },
];
const menuLogin = [
  { name: "Home", href: "/", current: true },
  { name: "Projects", href: "/projects", current: false },
  { name: "Calendar", href: "/calendar", current: false },
];

export default menuReducer;
