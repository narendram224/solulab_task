import {FETCH_ALL_TICKER_FAILURE, FETCH_ALL_TICKER_SUCCESS, FETCH_ALL_TICKER_REQUEST } from "./tickerType"
import Axios from "axios"

 const fetchAllTickersRequest = ()=>{
    return {
        type:FETCH_ALL_TICKER_REQUEST
    }
}
 const fetchAllTickersSuccess = user=>{
        return {
            type:FETCH_ALL_TICKER_SUCCESS,
            payload:user
        }
}   

 const fetchAllTickersFailure = error=>{
    return {
        type:FETCH_ALL_TICKER_FAILURE,
        payload:error
    }
}

// Api call code for fetch all tickers 

export const fetchUser = ()=>{
    return (dispatch)=>{
            dispatch(fetchUserRequest);
            Axios.get("https://jsonplaceholder.typicode.com/users")
            .then( response=>{
                    const user = response.data;
                    dispatch(fetchUserSuccess(user))
            })
            .catch((err)=>{
                const error = err.message;
                dispatch(fetchUserFailure((error)))
            })
    }
}