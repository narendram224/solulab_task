import * as actions from './SocketType';
import { fetchTickerHistoryData } from '../Ticker/tickerAction';
// import { updateGame, updateTimer, updateGamePlayer } from '../modules/game';

const socketMiddleware = () => {
  let socket = null;

  const onOpen = (store,cb) => (event) => {
    store.dispatch(actions.wsConnected(event.target.url));
    cb();
  };

  const onClose = store => () => {
    store.dispatch(actions.wsDisconnected());
  };

  const onMessage = store => (event) => {
    const payload = JSON.parse(event.data);
    console.log("payload ",event.type);
    switch (event.type) {
      case 'message':
        store.dispatch(fetchTickerHistoryData(payload));
        break;
      default:
        console.log(payload);
        break;
    }
  };

  return store => next => (action) => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket(action.host);
        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store,action.cb);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case 'LEAVE_GAME':
        socket.send(JSON.stringify({ command: 'LEAVE_GAME' }));
        break;
      case 'FETCH_ALL_HISTORY':
          console.log("the action for fetch ticker history",action.channel,action.symbol);
        socket.send(JSON.stringify({ 
      event: 'subscribe', 
      channel:action.channel, 
      symbol:action.symbol 
    }));
        break;
      case 'START_ROUND':
        socket.send(JSON.stringify({ command: 'START_ROUND' }));
        break;
      case 'MAKE_MOVE':
        socket.send(
          JSON.stringify({
            command: 'MAKE_MOVE',
            move: action.move,
            victim: action.victim,
          }),
        );
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();