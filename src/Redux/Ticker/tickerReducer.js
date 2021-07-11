import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./tickerType";
import produce from "immer"

const initialState ={
    loading:false,
    users:[],
    error:''
}


// Reducer with initial state
const INITIAL_STATE = [
    /* bunch of todos */
]

const tickerReducer = produce((draft=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                user:action.payload,
                error:''
            }
        case FETCH_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload,
                user:[]
            }
        default:
            return state;
    }
})

export default tickerReducer;