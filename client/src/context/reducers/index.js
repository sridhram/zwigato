import {combineReducers} from "redux";

import userReducer from "./userReducer";
import alertReducer from "./alertReducers";
import productsReducer from "./productReducers";
import userListReducer from "./userListReducer";

const combinedReducers = combineReducers({
    user : userReducer,
    alert : alertReducer,
    products : productsReducer,
    userList: userListReducer
});

export default combinedReducers;