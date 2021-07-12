import { combineReducers } from "redux";
import tickerReducer from "./Ticker/tickerReducer";
import { websocketReducer } from "./socket/SocketType";

 const rootReducers = combineReducers({
    ticker:tickerReducer,
    websocket: websocketReducer,
});
export default rootReducers;