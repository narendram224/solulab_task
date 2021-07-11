import React from 'react';
import logo from './logo.svg';
import './App.css';
import FirstCompoent from './components/firstCompoent';
import { Provider } from 'react-redux';
import store from './Redux/store';
import HomePage from './Pages/HomePage';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <HomePage />
    </div>
    </Provider>
  );
}

export default App;