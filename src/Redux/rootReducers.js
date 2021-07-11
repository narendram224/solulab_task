import { combineReducers } from "redux";
import tickerReducer from "./ticker/tickerReducer";

 const rootReducers = combineReducers({
    ticker:tickerReducer
});
export default rootReducers;