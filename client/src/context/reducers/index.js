import {combineReducers} from "redux";

import userReducer from "./userReducer";
import alertReducer from "./alertReducers";
import productsReducer from "./productReducers";

const combinedReducers = combineReducers({
    user : userReducer,
    alert : alertReducer,
    products : productsReducer,
});

export default combinedReducers;