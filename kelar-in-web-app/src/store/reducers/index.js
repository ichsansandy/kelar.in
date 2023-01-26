import { combineReducers } from "redux";
import assignProjectListReducer from "./assignProjectList";
import listUserReducer from "./listUser";
import loggedInUserReducer from "./loggedInUser";
import menuReducer from "./menuReducer";
import ownProjectListReducer from "./ownPorjectList";
import statusColorReducer from "./statusColorReducer";

const reducers = combineReducers({
  menu: menuReducer,
  ownProjects: ownProjectListReducer,
  assignProjects: assignProjectListReducer,
  listUser: listUserReducer,
  loggedInUser: loggedInUserReducer,
  statusColor: statusColorReducer,
});

export default reducers;
