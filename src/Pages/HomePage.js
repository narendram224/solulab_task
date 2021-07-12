import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccordionCom from '../Components/Atoms/Accordion';
import { Grid } from '@material-ui/core';
import './HomePage.css'
import { wsConnect, newMessage, fetch_all_history, wsDisconnect } from '../Redux/socket/SocketType';
import {fetchTickerHistoryData} from '../Redux/Ticker/tickerAction'; 

const HomePage = () => {
//  redux hooks for dispatch actions
  const dispatch = useDispatch();
//Socket  connection and joining method 

const connectAndJoin = () => {
  const host = "wss://api-pub.bitfinex.com/ws/2";
  dispatch(wsConnect(host,fetchTickerHistory));
};
  useEffect(() => {
  connectAndJoin()
  // unmount call
    return ()=>{
      dispatch(wsDisconnect())
    }
  })
// callback after completed the socket connection
  const fetchTickerHistory = ()=>{
     dispatch(fetch_all_history('ticker','tBTCUSD'))
    //  setTimeout(() => {
    //   dispatch(wsDisconnect())
    //  },10000);
  }

// State of ticker from stor
    const tickers = useSelector(state=>state.ticker);
    return (
        <div className="ticker_Grid_wrapper">

        <Grid container  >
  <Grid container item xs={12} sm={6} md={5} lg={4}  className="ticker_section">
    <AccordionCom ticker={tickers} />

  </Grid>
  <Grid container item xs={12} sm={6} md={7} lg={8}   style={{backgroundColor:"tomato"}} >
      Candle Chat showing here
            {/* <button onClick={()=>dispatch(buycake())}>buy cake</button> */}

  </Grid>
  
</Grid>
</div>
     
    )
}

export default HomePage
