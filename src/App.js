import React, { useEffect } from 'react';
import './App.css';
import { connect  } from 'react-redux';

import HomePage from './Pages/HomePage';
// import { io } from "socket.io-client";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import useWebSocker from './Pages/Socket';
import { wsConnect } from './Redux/socket/SocketType';

const client = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2/tickers?symbols=tBTCUSD');
// const socket = io(' https://api-pub.bitfinex.com/v2/tickers');
// const socket = io('wss://api-pub.bitfinex.com/ws/2',{
//   cors: {
//     origin: "wss://api-pub.bitfinex.com/ws/2",
//     methods: ["GET"]
//   }
// });





function App(props) {
  // const {sendMsg} = useWebSocker();
  // console.log(sendMsg);

  
  const connectAndJoin = () => {
    const { id, dispatch } = props;
    const host = "wss://api-pub.bitfinex.com/ws/2/tickers?symbols=tBTCUSD";
    dispatch(wsConnect(host));
  };
  
useEffect(() => {
  // connectAndJoin()
  // sendMsg('ticker','tBTCUSD');
  // client.onopen = () => {
  //   console.log('WebSocket Client Connecteds');
  //   let msg = JSON.stringify({ 
  //     event: 'subscribe', 
  //     channel: 'ticker', 
  //     symbol: 'tBTCUSD' 
  //   })
  //    client.send(msg)
  // };
  // client.onmessage = (e) => {
  //   // if (typeof e.data === 'string') {
  //     // console.log("Received: '" + e + "'");
  //     console.log(e.data);
      
  // // }
  // };
 

  // socket.on("connection", (socket) => {
    // console.log(socket.handshake.query); // prints { x: "42", EIO: "4", transport: "polling" }
  // });
  // socket.on("connect_error", (e) => {
  //   // revert to classic upgrade
  //   socket.io.opts.transports = ["polling", "websocket"];
  //   console.log("connection error",e);
    
  // });
//   socket.onopen = () => {
// console.log("connected");
//   }
// socket.onmessage = evt => {
//   // listen to data sent from the websocket server
//   const message = JSON.parse(evt.data)
//   this.setState({dataFromServer: message})
//   console.log(message)
//   }
  return ()=>{
      client.onclose = () =>{
        console.log('echo-protocol Client Closed');
    };
  }
}, [])
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default connect()(App);