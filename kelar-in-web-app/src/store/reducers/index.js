import { combineReducers } from "redux";
import assignProjectListReducer from "./assignProjectList";
import menuReducer from "./menuReducer";
import ownProjectListReducer from "./ownPorjectList";

const reducers = combineReducers({
  menu: menuReducer,
  ownProjects: ownProjectListReducer,
  assignProjects: assignProjectListReducer,
});

export default reducers;
