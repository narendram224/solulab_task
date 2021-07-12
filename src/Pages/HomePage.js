import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccordionCom from '../Components/Atoms/Accordion';
import { Grid, Button } from '@material-ui/core';
import { wsConnect, fetch_all_history, wsDisconnect } from '../Middleware/SocketReducer';
import SimpleSnackbar from '../Components/Atoms/Toster';
import { WEB_SOCKET_BASE_URL } from '../Contant';

const HomePage = () => {
//  redux hooks for dispatch actions
  const dispatch = useDispatch();
  const childRef = useRef();
//Socket  connection and joining method 

const connectAndJoin = () => {
  const host = WEB_SOCKET_BASE_URL;
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
  }
  const handleCloseConnection = ()=>{
    dispatch(wsDisconnect());
    childRef.current.openToaster("Close the connection")
  }
  const handleOpenConnection = ()=>{
    connectAndJoin()
    childRef.current.openToaster("Open the connection")
  }

// State of ticker from stor
    const tickers = useSelector(state=>state.ticker);
    return (
        <div className="ticker_Grid_wrapper">

        <Grid container  >
  <Grid container item xs={12} sm={6} md={5} lg={4}  className="ticker_section">
    <AccordionCom ticker={tickers} />

  </Grid>
  <Grid container item xs={12} sm={6} md={7} lg={8}  >
    <div style={{margin:"1em"}} >
      
    <Button variant="contained" style={{backgroundColor:"#32CD32",color:"white",margin:"1em"}} onClick={handleOpenConnection} >Connect</Button>
    <Button variant="contained" style={{backgroundColor:"tomato",color:"white",margin:"1em"}} onClick={handleCloseConnection}>Disconnect</Button>
<SimpleSnackbar ref={childRef} />
</div>

            {/* <button onClick={()=>dispatch(buycake())}>buy cake</button> */}

  </Grid>
  
</Grid>
</div>
     
    )
}

export default HomePage
