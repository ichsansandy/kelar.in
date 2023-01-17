import { combineReducers } from "redux";
import menuReducer from "./menuReducer";

const reducers = combineReducers({
  menu: menuReducer,
});

export default reducers;
