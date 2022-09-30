import React from 'react';
import { Provider } from 'react-redux';
import store from '../app/store';
import AppRouter from './Router';

function App() {
  return (
    <div className="App" >
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
