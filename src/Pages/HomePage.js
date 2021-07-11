import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
const HomePage = () => {
    const tickers = useSelector(state=>state.ticker);
    const dispatch = useDispatch();
    return (
        <div>
        Home Page
         <h2>No of Cake:{noOfCake}</h2>
            <button onClick={()=>dispatch(buycake())}>buy cake</button>
        </div>
    )
}

export default HomePage
