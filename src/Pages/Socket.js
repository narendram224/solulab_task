import React, { useEffect, useRef, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2/tickers?symbols=tBTCUSD');
var connectInterval;

const useWebSocker = ()=>{
    const ref = useRef();
    const [ws, setws] = useState( null);
let time =250;
    const sendMsg =(channel,symbol)=>{
          let msg = JSON.stringify({ 
      event: 'subscribe', 
      channel, 
      symbol
    })
            ref.current.send(msg);
    }
     // function that check the websocket is connected or not
    
    const connect = () =>{
          
        client.onopen = ()=>{
            console.log("connected to socket");
            
            setws({ws:ws})
            time =250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        } 

         // websocket onerror event listener
         client.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            client.close();
        };
        client.onmessage = (event)=>{
            const response = JSON.parse(event.data);
            console.log(response.data);
        }
       
        // websocket onclose event listener
        client.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (time+time) / 1000
                )} second.`,
                e.reason
            );

            time = time + time; //increment retry interval
            connectInterval = setTimeout(check, Math.min(10000, time)); //call check function after timeout
        };
        ref.current = client;
    }
    useEffect(() => {
        connect();
        return () => {
            client.close();
            console.log("cleanup functions close the socket");
            
        }
    }, [])
    const  check = () => {
        //check if websocket instance is closed, if so call `connect` function.
       if (!ws || ws.readyState == client.CLOSED) connect();
   };

    return {
        sendMsg
    }

}

export default useWebSocker;