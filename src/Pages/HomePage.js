import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccordionCom from '../Components/Atoms/Accordion';
import { Grid } from '@material-ui/core';
import './HomePage.css'
const HomePage = () => {
    const tickers = useSelector(state=>state.ticker);
    const dispatch = useDispatch();
    return (
        <div className="ticker_Grid_wrapper">

        <Grid container  >
  <Grid container item xs={12} sm={6} md={5} lg={4}  className="ticker_section">
    <AccordionCom />

  </Grid>
  <Grid container item xs={12} sm={6} md={7} lg={8}   style={{backgroundColor:"tomato"}} >
      hellow
            {/* <button onClick={()=>dispatch(buycake())}>buy cake</button> */}

  </Grid>
  
</Grid>
</div>
     
    )
}

export default HomePage
