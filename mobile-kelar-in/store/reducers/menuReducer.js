const menuReducer = (
  state = [
    { id: 1, name: "Home", href: "/", current: true },
    { id: 2, name: "Projects", href: "/projects", current: false },
    { id: 3, name: "Calendar", href: "/calendar", current: false },
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
  { id: 1, name: "Register", href: "/register", current: false },
  { id: 2, name: "Login", href: "/login", current: false },
];
const menuLogin = [
  { id: 1, name: "Home", href: "/", current: false },
  { id: 2, name: "Projects", href: "/projects", current: false },
  { id: 3, name: "Messaging", href: "/messaging", current: false },
];

export default menuReducer;
