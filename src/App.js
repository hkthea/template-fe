import React from 'react';
import {Provider} from 'react-redux';
import configureStore from "./redux/store";
import MainApp from './MainApp';
const store=configureStore();

function App() {
  
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
