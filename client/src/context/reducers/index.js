import {combineReducers} from "redux";

import userReducer from "./userReducer";
import alertReducer from "./alertReducers";

const combinedReducers = combineReducers({
    user : userReducer,
    alert : alertReducer,
});

export default combinedReducers;