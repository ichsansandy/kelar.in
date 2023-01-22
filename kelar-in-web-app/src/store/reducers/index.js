import { combineReducers } from "redux";
import assignProjectListReducer from "./assignProjectList";
import listUserReducer from "./listUser";
import menuReducer from "./menuReducer";
import ownProjectListReducer from "./ownPorjectList";

const reducers = combineReducers({
  menu: menuReducer,
  ownProjects: ownProjectListReducer,
  assignProjects: assignProjectListReducer,
  listUser: listUserReducer,
});

export default reducers;
