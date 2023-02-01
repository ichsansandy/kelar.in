import { combineReducers } from "redux";
import assignProjectListReducer from "./assignProjectList";
import countIsReadReducer from "./countIsReadReducer";
import listUserReducer from "./listUser";
import loggedInUserReducer from "./loggedInUser";
import menuReducer from "./menuReducer";
import newProjectMemberReducer from "./newProjectMemberReducer";
import ownProjectListReducer from "./ownPorjectList";
import statusColorReducer from "./statusColorReducer";
import taskListReducer from "./taskListReducer";

const reducers = combineReducers({
  menu: menuReducer,
  ownProjects: ownProjectListReducer,
  assignProjects: assignProjectListReducer,
  listUser: listUserReducer,
  loggedInUser: loggedInUserReducer,
  statusColor: statusColorReducer,
  tasksList: taskListReducer,
  newMemberProject: newProjectMemberReducer,
  countIsRead: countIsReadReducer,
});

export default reducers;
